import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { CaseScheduling } from "@/components/sections/case-scheduling";
import { CasePerformance } from "@/components/sections/case-performance";
import { CaseComponents } from "@/components/sections/case-components";
import { HowIWork } from "@/components/sections/how-i-work";
import { Stack } from "@/components/sections/stack";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Impact />
        <CaseScheduling />
        <CasePerformance />
        <CaseComponents />
        <HowIWork />
        <Stack />
        <About />
        <Contact />
      </main>
    </>
  );
}
