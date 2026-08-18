import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    // Bottom padding sized so the #about landing shows the first line of
    // the contact headline as a teaser at typical viewport heights, not a
    // wall of blue and not a stretch of dead paper.
    <section className="pt-section pb-24 sm:pb-28">
      <div id="about" className="shell scroll-mt-24">
        <Reveal>
          <div className="grid items-start gap-12 sm:grid-cols-[16rem_1fr] sm:gap-16">
            <div className="relative mx-auto w-56 rotate-[-2deg] sm:mx-0 sm:w-64">
              <Image
                src="/Wahaj.jpeg"
                alt="Wahaj Ahmed"
                width={256}
                height={256}
                sizes="(min-width: 640px) 256px, 224px"
                className="desk-red rounded-edge border-2 border-ink"
              />
              <span className="stamp absolute -right-5 -bottom-5">est. islamabad</span>
            </div>

            <div className="grid max-w-[60ch] gap-5 text-body text-muted">
              <h2 className="text-title text-ink">About</h2>
              <p>
                I work on the parts of a product users never see directly: the
                data layer that has to stay consistent, the endpoint that has
                to stay fast, the component everyone else builds on. Most of
                what I am proud of is invisible when it works.
              </p>
              <p>
                The pattern across the case files is the same. Measure the
                thing that is actually failing, change the shape of the system
                rather than tuning around the symptom, then check the number
                moved. A gateway timeout is not a query problem. Duplicate
                components are not a code problem. Both are architecture
                answering the wrong question.
              </p>
              <p>
                Recent client work includes{" "}
                <a
                  href="https://www.channel-dynamics.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-blue decoration-2 underline-offset-4"
                >
                  Channel Dynamics
                </a>
                , a market-intelligence platform for institutional investors.
              </p>
              <p>Based in Islamabad, working remotely with teams anywhere.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
