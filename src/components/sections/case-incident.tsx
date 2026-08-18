import { IncidentIso } from "@/components/incident-iso";
import { Reveal } from "@/components/reveal";
import { ScrollSteps } from "@/components/scroll-steps";

function Figure() {
  return (
    <div className="relative">
      <figure className="desk-dark rounded-edge border-2 border-ink bg-paper p-4 text-ink sm:p-5">
        <IncidentIso />
        <figcaption className="mt-3 border-t border-line pt-3 font-mono text-[11px] text-muted">
          fig. 2: the investigation, as it actually went. the error existed
          for weeks before anything admitted it.
        </figcaption>
      </figure>
      <span className="stamp scene-stamp absolute -bottom-4 right-6">all 30 paid</span>
    </div>
  );
}

export function CaseIncident() {
  return (
    <section className="bg-band py-section text-paper">
      <div id="incident" className="shell scroll-mt-24">
        <Reveal>
          <p className="font-mono text-small text-bluesoft">case file 02: incident report</p>
          <h2 className="mt-2 max-w-[20ch] text-title text-paper">
            Payday, minus thirty teachers
          </h2>
          <p className="mt-4 font-mono text-small text-bandmuted">
            Node.js, AWS Lambda, DynamoDB, New Relic
          </p>
        </Reveal>

        <div className="mt-14">
          <ScrollSteps
            tone="band"
            sceneClass="scene-inc"
            figure={<Figure />}
            steps={[
              {
                title: "Symptom: money missing, logs quiet.",
                body: (
                  <p>
                    Around 4,500 teachers were due payment. Product sent over
                    a spreadsheet with about thirty names on it: paid nothing.
                    In DynamoDB, the earnings attribute for exactly those
                    teachers had never been written. No alert had fired and no
                    error had been logged. As far as the system was concerned,
                    nothing had happened.
                  </p>
                ),
              },
              {
                title: "Investigation: the function that never confessed.",
                body: (
                  <p>
                    The trace led through New Relic to the update function. It
                    was invoked, it completed, and the write simply never
                    landed. The reason nothing surfaced: no error capture at
                    the process level, so the failure had nowhere to land and
                    quietly vanished. You cannot debug an error that is never
                    allowed to exist.
                  </p>
                ),
              },
              {
                title: "Root cause: the index was throttling.",
                body: (
                  <p>
                    Error capture went in first, before any fix. The very next
                    run confessed: DynamoDB was rejecting writes because the
                    index&apos;s provisioned capacity was too low for payday
                    load. Roughly thirty writes lost that race every cycle,
                    silently, and the names changed each time.
                  </p>
                ),
              },
              {
                title: "Remediation, then prevention.",
                body: (
                  <>
                    <p>
                      The thirty were paid manually, verified name by name
                      against the sheet. The provisioning was raised, and the
                      failure never recurred.
                    </p>
                    <p>
                      What stayed with me is the prevention: errors that are
                      captured where they happen, and logs that mean
                      something. An incident should start from a query, not
                      from a spreadsheet someone else noticed.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
