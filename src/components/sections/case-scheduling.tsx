import { Reveal } from "@/components/reveal";
import { GraphCanvas } from "@/components/three/graph-canvas";

export function CaseScheduling() {
  return (
    <section id="work" className="shell scroll-mt-24 py-section">
      <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="text-title">Student Management Platform</h2>
          <p className="mt-4 font-mono text-small text-muted">
            React, Node.js, GraphQL, AWS Lambda, SQS, S3, DynamoDB
          </p>

          <p className="mt-8 max-w-[46ch] text-lead text-fg">
            Full-stack scheduling for an enterprise tutoring platform. Over
            100,000 students per district, with scheduling errors down 90%.
          </p>

          <div className="mt-6 grid gap-5 max-w-[46ch] text-body text-muted">
            <p>
              Report exports were the failure point. Large districts produced
              datasets big enough that the request timed out at API Gateway
              before the response finished, and query tuning could not reach it
              because the gateway timeout is a platform limit rather than a slow
              query. So exports left the request path entirely. A scheduled job
              builds the report, writes it to S3, and the client receives a
              pre-signed URL instead of a payload. API Gateway is no longer in
              the data path, which is what stopped report size from being an
              availability problem.
            </p>
            <p>
              Alongside that: validation and consistency checks that block
              conflicting or duplicate student assignments, and an admin
              dashboard with downloadable schedule summaries.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" index={1}>
          <GraphCanvas />
          <p className="mt-5 max-w-[52ch] text-small text-muted">
            The export path. Reads go through the gateway to Lambda and
            DynamoDB. Exports queue through SQS to S3, and S3 hands the client a
            pre-signed URL directly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
