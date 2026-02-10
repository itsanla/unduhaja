// Tests for the document conversion system
// Uses mocked pandoc-engine and pdfjs-dist for unit testing.

import { describe, it, expect, vi } from "vitest";

/** Helper: create a mock File from text content */
function mockFile(name: string, content: string, type = "text/plain"): File {
  return new File([content], name, { type });
}

/** Noop progress callback */
const noop = () => {};

// ─── convertDocument router (Pandoc-based) ──────────

describe("convertDocument router", () => {
  it("should convert TXT → HTML via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("sample.txt", "Hello World\nLine 2");
    const progress = vi.fn();

    const result = await convertDocument(file, "html", progress);

    expect(result.ext).toBe("html");
    const html = await result.blob.text();
    expect(html).toContain("Hello World");
  });

  it("should convert TXT → DOCX via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("sample.txt", "Line 1\nLine 2\nLine 3");
    const progress = vi.fn();

    const result = await convertDocument(file, "docx", progress);

    expect(result.ext).toBe("docx");
    expect(result.blob.size).toBeGreaterThan(0);
    // DOCX/ZIP files start with PK
    const header = new Uint8Array(await result.blob.slice(0, 2).arrayBuffer());
    expect(header[0]).toBe(0x50); // P
    expect(header[1]).toBe(0x4b); // K
  });

  it("should convert TXT → Markdown via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("sample.txt", "Hello Markdown");
    const progress = vi.fn();

    const result = await convertDocument(file, "md", progress);

    expect(result.ext).toBe("md");
    const text = await result.blob.text();
    expect(text).toContain("Hello Markdown");
  });

  it("should convert HTML → TXT via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const htmlContent = `<html><body><h1>Title</h1><p>Hello <b>world</b></p></body></html>`;
    const file = mockFile("page.html", htmlContent, "text/html");
    const progress = vi.fn();

    const result = await convertDocument(file, "txt", progress);

    expect(result.ext).toBe("txt");
    const text = await result.blob.text();
    expect(text).toContain("Title");
    expect(text).toContain("Hello");
  });

  it("should convert HTML → DOCX via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const htmlContent = `<html><body><p>Hello from HTML</p></body></html>`;
    const file = mockFile("page.html", htmlContent, "text/html");
    const progress = vi.fn();

    const result = await convertDocument(file, "docx", progress);

    expect(result.ext).toBe("docx");
    expect(result.blob.size).toBeGreaterThan(0);
    const header = new Uint8Array(await result.blob.slice(0, 2).arrayBuffer());
    expect(header[0]).toBe(0x50);
    expect(header[1]).toBe(0x4b);
  });

  it("should convert DOCX → HTML via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "doc.docx",
      "Document content here",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "html", progress);

    expect(result.ext).toBe("html");
    const html = await result.blob.text();
    expect(html).toContain("Document content here");
  });

  it("should convert DOCX → TXT via Pandoc", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "doc.docx",
      "Some DOCX text",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "txt", progress);

    expect(result.ext).toBe("txt");
    const text = await result.blob.text();
    expect(text).toContain("Some DOCX text");
  });
});

// ─── Document → Image screenshot ──────

describe("Document → Image screenshot", () => {
  it("should convert DOCX → JPG via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "doc.docx",
      "Screenshot content",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "jpg-pages", progress);

    expect(result.ext).toBe("jpg");
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.blob.type).toBe("image/jpeg");
  });

  it("should convert DOCX → PNG via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "doc.docx",
      "PNG screenshot",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "png-pages", progress);

    expect(result.ext).toBe("png");
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.blob.type).toBe("image/png");
  });

  it("should convert DOCX → WEBP via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "doc.docx",
      "WEBP screenshot",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "webp-pages", progress);

    expect(result.ext).toBe("webp");
    expect(result.blob.size).toBeGreaterThan(0);
    expect(result.blob.type).toBe("image/webp");
  });

  it("should convert HTML → JPG via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile(
      "page.html",
      "<html><body><h1>Hello</h1><p>World</p></body></html>",
      "text/html"
    );
    const progress = vi.fn();

    const result = await convertDocument(file, "jpg-pages", progress);

    expect(result.ext).toBe("jpg");
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("should convert TXT → JPG via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("notes.txt", "Plain text screenshot");
    const progress = vi.fn();

    const result = await convertDocument(file, "jpg-pages", progress);

    expect(result.ext).toBe("jpg");
    expect(result.blob.size).toBeGreaterThan(0);
  });

  it("should convert Markdown → PNG via screenshot", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("readme.md", "# Title\n\nParagraph content", "text/markdown");
    const progress = vi.fn();

    const result = await convertDocument(file, "png-pages", progress);

    expect(result.ext).toBe("png");
    expect(result.blob.size).toBeGreaterThan(0);
  });
});

// ─── PDF restrictions ──────

describe("PDF conversion restrictions", () => {
  it("should reject PDF → TXT (not yet supported)", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("test.pdf", "content", "application/pdf");

    await expect(convertDocument(file, "txt", noop)).rejects.toThrow(
      /hanya dapat dikonversi ke JPG/
    );
  });

  it("should reject PDF → HTML (not yet supported)", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("test.pdf", "content", "application/pdf");

    await expect(convertDocument(file, "html", noop)).rejects.toThrow(
      /hanya dapat dikonversi ke JPG/
    );
  });

  it("should reject PDF → DOCX (not yet supported)", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("test.pdf", "content", "application/pdf");

    await expect(convertDocument(file, "docx", noop)).rejects.toThrow(
      /hanya dapat dikonversi ke JPG/
    );
  });

  it("should reject TXT → PDF (not yet supported)", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("sample.txt", "Hello");

    await expect(convertDocument(file, "pdf", noop)).rejects.toThrow(
      /belum didukung/
    );
  });
});

// ─── Error handling ──────

describe("error handling", () => {
  it("should throw for unsupported source format", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("file.xyz", "content");

    await expect(convertDocument(file, "html", noop)).rejects.toThrow();
  });

  it("should throw for unsupported PDF target format", async () => {
    const { convertDocument } = await import("@/lib/converter/doc/index");
    const file = mockFile("test.pdf", "content", "application/pdf");

    await expect(convertDocument(file, "mp3", noop)).rejects.toThrow();
  });
});

