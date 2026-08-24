import { Hero, Marquee, Statement } from "../components/Top.jsx";
import { Pricing, ContactCard } from "../components/Social.jsx";
import { FAQ } from "../components/ui/faq-section.jsx";
import { StackStrip } from "../components/ui/stack-strip.jsx";
import { HowItWorks } from "../components/ui/how-it-works.jsx";
import { WhatIDo } from "../components/ui/what-i-do.jsx";
import { Quote } from "../components/Quote.jsx";

export function Home() {
  return (
    <>
      <Hero />
      <StackStrip />
      <Marquee />
      <Statement />
      <WhatIDo />
      <HowItWorks />
      <FAQ />
      <Pricing />
      <ContactCard />
      <Quote />
    </>
  );
}
