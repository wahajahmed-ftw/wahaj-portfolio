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
              I studied computer science at Bahria University in Islamabad,
              started at Teknotize as a full stack intern, and was promoted to
              Associate Software Engineer three months in. I am now a Software
              Engineer at Volmatica, working across React front ends and Node
              services.
            </p>
            <p>
              Most of my work is in the parts users never see directly: the data
              layer that has to stay consistent, the endpoint that has to stay
              fast, the component everyone else builds on. I also built ProShop
              PK, a MERN e-commerce app, while learning that stack.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
