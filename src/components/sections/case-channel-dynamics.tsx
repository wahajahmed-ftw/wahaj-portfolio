import { CdIso } from "@/components/cd-iso";
import { Reveal } from "@/components/reveal";
import { ScrollSteps } from "@/components/scroll-steps";

function Figure() {
  return (
    <div className="relative">
      <figure className="desk-blue rounded-edge border-2 border-ink bg-white p-4 sm:p-5">
        <CdIso />
        <figcaption className="mt-3 border-t border-line pt-3 font-mono text-[11px] text-muted">
          fig. 3: AI in both directions. pushed out on a schedule, pulled in
          through entitlements.
        </figcaption>
      </figure>
      <span className="stamp scene-stamp absolute -bottom-4 right-6">
        7 tools, just launched
      </span>
    </div>
  );
}

export function CaseChannelDynamics() {
  return (
    <section className="py-section">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-small text-blue">case file 03</p>
          <h2 className="mt-2 max-w-[20ch] text-title">
            AI in production for institutional investors
          </h2>
          <p className="mt-4 font-mono text-small text-muted">
            Next.js, Supabase, Trigger.dev, Claude Haiku, MCP
          </p>
        </Reveal>

        <div className="mt-14">
          <ScrollSteps
            sceneClass="scene-cd"
            figure={<Figure />}
            steps={[
              {
                title: "A market-intelligence platform, end to end.",
                body: (
                  <p>
                    <a
                      href="https://www.channel-dynamics.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink underline decoration-blue decoration-2 underline-offset-4"
                    >
                      Channel Dynamics
                    </a>{" "}
                    serves institutional investors. I work across the whole
                    surface: the public site, the portal&apos;s analytics and
                    its filtering, and the observability wiring, so problems
                    show up as traces instead of guesses.
                  </p>
                ),
              },
              {
                title: "Every week, the numbers explain themselves.",
                body: (
                  <>
                    <p>
                      A weekly job compiles leadership metrics into charts
                      and one-line AI summaries. Trigger.dev runs it as a
                      queue and fans it out into parallel tasks, because work
                      that takes minutes does not belong inside a request.
                    </p>
                    <p>
                      The summaries are written by Haiku on purpose: they are
                      one-liners, and one-liners do not need a frontier
                      model. Right-sized is faster, cheaper, and just as
                      sharp at that length. A dozen leadership inboxes, every
                      week, on time.
                    </p>
                  </>
                ),
              },
              {
                title: "Their research, queryable from inside Claude.",
                body: (
                  <>
                    <p>
                      A production MCP server puts the published research
                      inside the customer&apos;s own Claude: seven tools to
                      list, fetch, and semantically search reports.
                    </p>
                    <p>
                      The hard part is entitlements. A company-level flag,
                      sector-level report entitlement, and per-user checks,
                      with OAuth tied to the customer&apos;s real account.
                      People only ever see what they are entitled to see,
                      which in financial data is the entire product.
                    </p>
                  </>
                ),
              },
              {
                title: "Just launched, in early use.",
                body: (
                  <p>
                    The MCP is newly launched and real customers are using
                    it. Same principles as every other case file here: long
                    work moved off the request path, access checked before
                    anything else, and contracts explicit enough that an AI
                    client can rely on them.
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
