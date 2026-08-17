import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-section">
      <Reveal>
        <div className="grid gap-10 sm:grid-cols-[13rem_1fr] sm:gap-14">
          <Image
            src="/Wahaj.jpeg"
            alt="Wahaj Ahmed"
            width={208}
            height={208}
            sizes="208px"
            className="rounded-edge grayscale w-52 h-52 object-cover"
          />

          <div className="grid max-w-[62ch] gap-5 text-body text-muted">
            <h2 className="text-title text-fg">About</h2>
            <p>
              I work on the parts of a product that users never see directly:
              the data layer that has to stay consistent, the endpoint that has
              to stay fast, the component everyone else builds on. Most of what
              I am proud of is invisible when it works.
            </p>
            <p>
              The pattern across the work above is the same. Measure the thing
              that is actually failing, change the shape of the system rather
              than tuning around the symptom, then check the number moved. A
              gateway timeout is not a query problem. Duplicate components are
              not a code problem. Both are architecture answering the wrong
              question.
            </p>
            <p>
              Based in Islamabad, working remotely with teams anywhere.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
