import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
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
        <Impact />
        <CaseScheduling />
        <CaseIncident />
        <CaseChannelDynamics />
        <QuickFiles />
        <HowIWork />
        <Stack />
        <About />
        <CaseSite />
        <Contact />
      </main>
    </>
  );
}
