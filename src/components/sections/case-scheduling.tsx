import { PipelineIso } from "@/components/pipeline-iso";
import { Reveal } from "@/components/reveal";
import { ScrollSteps } from "@/components/scroll-steps";

function Figure() {
  return (
    <div className="relative">
      <figure className="desk-blue rounded-edge border-2 border-ink bg-white p-4 sm:p-5">
        <PipelineIso mode="sched" />
      </figure>
      <span className="stamp scene-stamp absolute -bottom-4 right-6">
        errors down 90%
      </span>
    </div>
  );
}

export function CaseScheduling() {
  return (
    <section className="py-section">
      <div id="work" className="shell scroll-mt-24">
        <Reveal>
          <p className="font-mono text-small text-blue">case file 01</p>
          <h2 className="mt-2 max-w-[16ch] text-title">
            Scheduling for a district of 100,000 students
          </h2>
          <p className="mt-4 font-mono text-small text-muted">
            React, Node.js, GraphQL, AWS Lambda, SQS, S3, DynamoDB
          </p>
        </Reveal>

        <div className="mt-14">
          <ScrollSteps
            sceneClass="scene-sched"
            figure={<Figure />}
            steps={[
              {
                title: "A scheduling system under enterprise load.",
                body: (
                  <>
                    <p>
                      Full-stack scheduling for an enterprise tutoring
                      platform: over 100,000 students per district, every one
                      of them needing conflict-free assignments. Validation and
                      consistency checks block conflicting or duplicate
                      placements before they ever reach the database.
                    </p>
                    <p>The diagram on the left is the real pipeline.</p>
                  </>
                ),
              },
              {
                title: "Then report exports started timing out.",
                body: (
                  <p>
                    Large districts produced datasets big enough that the
                    request died at API Gateway before the response finished.
                    No query tuning could fix it, because the gateway timeout
                    is a platform limit, not a slow query. The failure lived in
                    the architecture, not the code.
                  </p>
                ),
              },
              {
                title: "So exports left the request path entirely.",
                body: (
                  <>
                    <p>
                      A scheduled job builds the report and writes it to S3,
                      and the client receives a pre-signed URL instead of a
                      payload. API Gateway is no longer in the data path.
                    </p>
                    <p>
                      That is what stopped report size from being an
                      availability problem: the thing that timed out is no
                      longer asked to carry the data.
                    </p>
                  </>
                ),
              },
              {
                title: "Shipped, stamped, in production.",
                body: (
                  <p>
                    Alongside the pipeline: an admin dashboard with
                    downloadable schedule summaries, and the consistency layer
                    that took scheduling errors down 90%.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
