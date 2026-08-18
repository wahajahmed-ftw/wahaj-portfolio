# wahaj-portfolio

My portfolio, built as an engineering document rather than a showreel: light
paper ground, hand-projected isometric figures, and scroll-driven case files
that stage themselves as you read.

The site argues that I care about how systems behave in production, so it had
to behave that way itself. That constraint drove most of what is interesting
in here.

## Constraints I set

**No canvas, no WebGL, no animation library.** Every figure is an SVG isometric
projection generated from a small maths module, and every animation is CSS.
The whole page ships React, Next.js and one smooth-scroll library, and nothing
else at runtime.

**Zero JavaScript for the visuals.** All four diagrams are server-rendered SVG.
With scripting disabled the page still renders its text, its figures, and its
scroll reveals; only the stepped scene states stop advancing.

**Measured, not estimated.** The performance claims on the site are from a
production Lighthouse run: 100 desktop, 98 mobile, 0 cumulative layout shift,
0ms total blocking time, every route prerendered at build.

## The parts worth reading

**`src/lib/iso.ts`** is the projection. Everything isometric on the site comes
from `px(u, v, z)`, which maps a point in isometric space to screen space
(`y = (u + v) · sin30 · S − z · S`). `isoBox` derives the three visible faces
of a cuboid, `isoPath` turns a route into an SVG path, and `route` bends a
connection along the two isometric axes. Circles on a horizontal plane project
to ellipses with radii `√2 · cos30 · S` and `√2 · 0.5 · S`, which is how the
cylinders and buckets are drawn.

**`src/components/stack-iso.tsx`** is the hero figure. Three planes explode
apart on load, each carrying its own furniture: a browser wireframe, service
cubes with face-projected glyphs, a database cylinder and an S3 bucket. A
single 7s CSS clock choreographs a causal round trip: the cursor presses a
button, a request falls down the layers, the middle service acknowledges, the
database flashes, the response climbs back, and the content refreshes. Every
loop starts and ends on its rest pose, so the reduced-motion floor lands on a
sane final frame.

**The scroll handoff.** A registered `@property --fold` is scrubbed 0 to 1 by
an `animation-timeline: view()` on the hero figure, packing the exploded stack
back together as it leaves the viewport. Worth knowing: an `overflow-hidden`
ancestor makes itself a scroll container and silently pins any descendant
`view()` timeline.

**`src/components/scroll-steps.tsx`** drives the case files. On desktop an
IntersectionObserver band around the viewport centre stamps a step index on
the wrapper and CSS does the rest, so the scenes are state machines rather than
scroll-jacking. Below the large breakpoint there is no sticky column and no
scroll runway to spend, so the scene plays itself on a timer while visible.
Reduced motion parks it on the final, fully revealed state.

## Running it

```bash
pnpm install
pnpm dev
```

Production builds need the canonical origin, or the build fails rather than
shipping localhost URLs in the canonical, Open Graph and sitemap tags:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com pnpm build
```

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 with a CSS-first
theme, Lenis for smooth scroll, Phosphor icons. No test suite: it is a static
document, and the checks that matter here are the build, the type checker and
Lighthouse.
