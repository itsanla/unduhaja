import {
  Navbar,
  Hero,
  SponsoredBy,
  AboutEvent,
  OurStats,
  EventContent,
  Faq,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SponsoredBy />
      <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer />
    </>
  );
}
