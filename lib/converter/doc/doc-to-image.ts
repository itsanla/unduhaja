// Document → Image converter (screenshot approach)
//
// Pipeline: DOCX/HTML/TXT/MD → Pandoc → HTML (with embedded media) → render → html2canvas → JPG/PNG/WEBP
//
// Key features:
//  - Images from DOCX are embedded as data: URIs (no external requests / 404s)
//  - Tables are fully styled with visible borders
//  - Waits for all images to load before capturing screenshot
//
// Accuracy: ~85-90% — good for visual snapshots of documents.
// Limitation: output is a rasterised image, not editable text.

import { pandocToHtmlWithMedia, canPandocConvertDirect } from "./pandoc-engine";

/** Supported image output formats and their MIME types */
const IMAGE_FORMAT_MAP: Record<string, { mime: string; ext: string }> = {
  "jpg-pages": { mime: "image/jpeg", ext: "jpg" },
  "png-pages": { mime: "image/png", ext: "png" },
  "webp-pages": { mime: "image/webp", ext: "webp" },
};

/** Quality for lossy formats (JPEG, WebP) */
const LOSSY_QUALITY = 0.92;

/**
 * Check if a target format is a document-to-image screenshot format.
 */
export function isDocImageFormat(toFormat: string): boolean {
  return toFormat in IMAGE_FORMAT_MAP;
}

/**
 * Convert a document (DOCX, HTML, TXT, MD) to an image (JPG, PNG, WEBP)
 * by rendering the Pandoc HTML output through html2canvas.
 */
export async function docToImage(
  file: File,
  toFormat: string,
  onProgress: (pct: number) => void,
): Promise<{ blob: Blob; ext: string }> {
  const fmt = IMAGE_FORMAT_MAP[toFormat];
  if (!fmt) {
    throw new Error(`Format gambar "${toFormat}" tidak didukung`);
  }

  const fromExt = file.name.split(".").pop()?.toLowerCase() || "";
  onProgress(5);

  // ── Step 1: Get HTML content with embedded media (0–50%) ──
  let html: string;

  if (fromExt === "html" || fromExt === "htm") {
    // Already HTML — read directly (images may be external, best-effort)
    html = await file.text();
    onProgress(50);
  } else if (canPandocConvertDirect(fromExt, "html")) {
    // Convert via Pandoc with media embedding (images become data: URIs)
    html = await pandocToHtmlWithMedia(file, (pct) => {
      onProgress(5 + Math.round(pct * 0.45));
    });
  } else {
    throw new Error(`Format sumber "${fromExt}" tidak dapat dikonversi ke gambar`);
  }

  onProgress(55);

  // ── Step 2: Render HTML in a hidden container ──
  const container = createRenderContainer(html);
  document.body.appendChild(container);

  // Wait for all embedded images to finish loading
  await waitForImages(container);
  // Extra settle time for fonts and layout
  await new Promise((r) => setTimeout(r, 200));
  onProgress(65);

  try {
    // ── Step 3: Capture screenshot via html2canvas (65–90%) ──
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(container, {
      scale: 2, // 2x for crisp output
      useCORS: true,
      allowTaint: true, // Allow data: URIs
      backgroundColor: "#ffffff",
      logging: false,
      width: container.scrollWidth,
      height: container.scrollHeight,
      // Force html2canvas to use the container's actual dimensions
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight,
    });

    onProgress(90);

    // ── Step 4: Convert canvas to target image format ──
    const blob = await canvasToBlob(canvas, fmt.mime);
    onProgress(100);

    return { blob, ext: fmt.ext };
  } finally {
    // Always clean up the render container
    document.body.removeChild(container);
  }
}

/**
 * Wait for all <img> elements in a container to finish loading.
 * Times out after 5 seconds to prevent hanging on broken images.
 */
async function waitForImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll("img"));
  if (images.length === 0) return;

  const timeout = 5000;
  const loadPromises = images.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block on broken images
      }),
  );

  await Promise.race([
    Promise.all(loadPromises),
    new Promise<void>((r) => setTimeout(r, timeout)),
  ]);
}

/**
 * Create a hidden but fully-rendered container for the HTML content.
 * The container is positioned off-screen but NOT display:none
 * (html2canvas needs the element to be rendered).
 */
function createRenderContainer(html: string): HTMLDivElement {
  const container = document.createElement("div");

  // Position off-screen but still rendered (html2canvas requirement)
  Object.assign(container.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    width: "794px", // A4 width in pixels at 96dpi
    backgroundColor: "#ffffff",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#1a1a1a",
    zIndex: "-1",
    overflow: "visible",
  });

  // Strip <html>/<head>/<body> wrappers — extract only the body content
  // so our container styles aren't overridden by Pandoc's standalone output.
  const bodyContent = extractBodyContent(html);

  // Inject the HTML with comprehensive styling
  container.innerHTML = `
    <style>
      /* Reset to ensure consistent rendering */
      .doc-render * { box-sizing: border-box; margin: 0; padding: 0; }

      /* Typography */
      .doc-render { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a; }
      .doc-render h1, .doc-render h2, .doc-render h3, .doc-render h4, .doc-render h5, .doc-render h6 {
        margin-top: 1em; margin-bottom: 0.5em; color: #111; font-weight: 600;
      }
      .doc-render h1 { font-size: 24px; border-bottom: 2px solid #ddd; padding-bottom: 0.3em; }
      .doc-render h2 { font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 0.2em; }
      .doc-render h3 { font-size: 17px; }
      .doc-render h4 { font-size: 15px; }
      .doc-render p { margin: 0.6em 0; }
      .doc-render ul, .doc-render ol { padding-left: 2em; margin: 0.5em 0; }
      .doc-render li { margin: 0.2em 0; }

      /* Tables — visible borders, proper padding */
      .doc-render table {
        border-collapse: collapse;
        margin: 1em 0;
        width: 100%;
        border: 1px solid #999;
        page-break-inside: avoid;
      }
      .doc-render th, .doc-render td {
        border: 1px solid #999;
        padding: 8px 12px;
        text-align: left;
        vertical-align: top;
      }
      .doc-render th {
        background-color: #f0f0f0;
        font-weight: 600;
        color: #333;
      }
      .doc-render tr:nth-child(even) td {
        background-color: #fafafa;
      }
      .doc-render caption {
        caption-side: top;
        font-weight: 600;
        margin-bottom: 0.5em;
        text-align: left;
      }

      /* Images */
      .doc-render img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0.8em auto;
      }

      /* Code */
      .doc-render pre {
        background: #f6f8fa;
        padding: 12px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 13px;
        margin: 0.8em 0;
        border: 1px solid #e1e4e8;
      }
      .doc-render code {
        background: #f0f0f0;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 13px;
        font-family: 'Consolas', 'Monaco', monospace;
      }
      .doc-render pre code { background: none; padding: 0; }

      /* Blockquote */
      .doc-render blockquote {
        border-left: 4px solid #ccc;
        margin: 0.8em 0;
        padding: 0.5em 1em;
        color: #555;
        background: #f9f9f9;
      }

      /* Links */
      .doc-render a { color: #0366d6; text-decoration: underline; }

      /* Figure captions (Pandoc generates <figure> for images) */
      .doc-render figure { margin: 1em 0; text-align: center; }
      .doc-render figcaption { font-size: 12px; color: #666; margin-top: 0.3em; font-style: italic; }
    </style>
    <div class="doc-render">${bodyContent}</div>
  `;

  return container;
}

/**
 * Extract body content from a full HTML document.
 * Pandoc standalone output includes <html><head>...</head><body>...</body></html>.
 * We need just the body content to avoid conflicting styles.
 */
function extractBodyContent(html: string): string {
  // Try to extract <body> content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1];
  }
  // If no <body> tag, return as-is (fragment or plain HTML)
  return html;
}

/**
 * Convert a canvas to a Blob with the specified MIME type.
 */
function canvasToBlob(canvas: HTMLCanvasElement, mime: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const quality = mime === "image/png" ? undefined : LOSSY_QUALITY;
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Gagal mengkonversi canvas ke gambar"))),
      mime,
      quality,
    );
  });
}
