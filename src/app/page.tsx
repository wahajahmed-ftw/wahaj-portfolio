import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { CaseScheduling } from "@/components/sections/case-scheduling";
import { CaseIncident } from "@/components/sections/case-incident";
import { CaseChannelDynamics } from "@/components/sections/case-channel-dynamics";
import { QuickFiles } from "@/components/sections/quick-files";
import { CaseSite } from "@/components/sections/case-site";
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
        <WhatIBuild />
        <CaseScheduling />
        <CaseIncident />
        <CaseChannelDynamics />
        <QuickFiles />
        <CaseSite />
        <HowIWork />
        <Stack />
        <About />
        <Contact />
      </main>
    </>
  );
}
