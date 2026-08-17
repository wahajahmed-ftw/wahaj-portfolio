// TEMPORARY specimen sheet for build step 1. Deleted in step 2 when the
// real sections land. It exists only so the tokens can be looked at.

const palette = [
  ["--color-bg", "#0a0a0b", "page"],
  ["--color-raise", "#141416", "photo backdrop, hover fill"],
  ["--color-line", "#1e1e21", "hairlines"],
  ["--color-faint", "#4a4a4c", "tertiary text"],
  ["--color-muted", "#8a8a8d", "secondary text"],
  ["--color-fg", "#ededee", "primary text, primary fill"],
];

const scale = [
  ["text-display", "Wahaj Ahmed", "H1, hero only"],
  ["text-title", "Selected work", "section titles"],
  ["text-sub", "Student Management Platform", "case study titles"],
  ["text-lead", "I build React and Node systems that hold up.", "hero subtext, ledes"],
  ["text-body", "Report exports were timing out at API Gateway.", "paragraphs"],
  ["text-small", "BS Computer Science, Bahria University", "captions, nav"],
];

export default function Home() {
  return (
    <main className="shell py-section space-y-24">
      <header className="space-y-3">
        <p className="font-mono text-label uppercase text-faint">Step 1 specimen</p>
        <h1 className="text-title">Tokens, type, layout</h1>
      </header>

      <section className="space-y-6">
        <h2 className="font-mono text-small text-muted">Palette</h2>
        <ul className="border-t border-line">
          {palette.map(([token, hex, use]) => (
            <li
              key={token}
              className="flex items-center gap-5 border-b border-line py-3"
            >
              <span
                className="size-8 shrink-0 rounded-edge border border-line"
                style={{ backgroundColor: hex }}
              />
              <code className="font-mono text-small w-44 shrink-0">{token}</code>
              <code className="font-mono text-small w-20 shrink-0 text-muted">
                {hex}
              </code>
              <span className="text-small text-faint">{use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="font-mono text-small text-muted">Type scale</h2>
        {scale.map(([cls, sample, use]) => (
          <div key={cls} className="border-t border-line pt-4">
            <div className="flex items-baseline gap-4 pb-3">
              <code className="font-mono text-small text-faint">{cls}</code>
              <span className="text-small text-faint">{use}</span>
            </div>
            <p className={cls}>{sample}</p>
          </div>
        ))}
        <div className="border-t border-line pt-4">
          <code className="font-mono text-small text-faint">text-metric</code>
          <p className="font-mono text-metric pt-3">100K+</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-mono text-small text-muted">Radius and rhythm</h2>
        <div className="flex flex-wrap items-end gap-8 border-t border-line pt-6">
          <div className="space-y-2">
            <div className="size-16 rounded-edge bg-raise border border-line" />
            <code className="font-mono text-small text-faint">radius-edge 4px</code>
          </div>
          <div className="space-y-2">
            <div className="h-16 w-[var(--spacing-gutter)] bg-raise" />
            <code className="font-mono text-small text-faint">gutter</code>
          </div>
          <div className="space-y-2">
            <div className="h-16 w-[var(--spacing-section)] bg-raise" />
            <code className="font-mono text-small text-faint">section</code>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-mono text-small text-muted">Buttons, one radius, no accent</h2>
        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <span className="rounded-edge bg-fg px-5 py-2.5 text-small font-medium text-bg">
            Selected work
          </span>
          <span className="rounded-edge border border-line px-5 py-2.5 text-small font-medium text-muted">
            Get in touch
          </span>
        </div>
      </section>
    </main>
  );
}
