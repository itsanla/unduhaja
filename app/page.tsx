import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutEvent from "@/components/about-event";
import OurStats from "@/components/our-stats";
import HeroScrollDemo from "@/components/peformance";
import { getAllPosts } from "@/lib/blog";

import {
  SponsoredBySkeleton,
  EventContentSkeleton,
  FaqSkeleton,
  FooterSkeleton,
} from "@/components/skeletons";

// Lazy-load below-fold & heavy components with skeleton fallbacks
const SponsoredBy = dynamic(() => import("@/components/sponsored-by"), {
  loading: () => <SponsoredBySkeleton />,
});
const EventContent = dynamic(() => import("@/components/event-content"), {
  loading: () => <EventContentSkeleton />,
});
const Faq = dynamic(() => import("@/components/faq"), {
  loading: () => <FaqSkeleton />,
});
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <FooterSkeleton />,
});

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 6).map((post) => ({
    category: post.frontmatter.categories?.[0] || "Artikel",
    title: post.frontmatter.title,
    src: post.frontmatter.image || "/image/event.webp",
    href: `/blog/${post.slug}`,
  }));

  return (
    <>
      <Navbar />
      <Hero />
      <SponsoredBy />
      <AboutEvent />
      <OurStats />
      <HeroScrollDemo/>
      <EventContent posts={latestPosts} />
      <Faq />
      <Footer />
    </>
  );
}
