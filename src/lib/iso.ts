// Isometric projection for the schematic scenes. Grid space (u, v, z) to SVG
// space. One projection shared by every diagram so nothing is hand-traced.

const CX = 0.866; // cos 30
const CY = 0.5; // sin 30
export const S = 36; // px per grid unit

export type Pt = { x: number; y: number };

export function px(u: number, v: number, z = 0): Pt {
  return { x: (u - v) * CX * S, y: (u + v) * CY * S - z * S };
}

const pts = (a: Pt[]) => a.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/** The three visible faces of an axis-aligned box sitting on the floor. */
export function isoBox(u: number, v: number, w: number, d: number, h: number) {
  const A = px(u, v);
  const B = px(u + w, v);
  const C = px(u + w, v + d);
  const D = px(u, v + d);
  const A2 = px(u, v, h);
  const B2 = px(u + w, v, h);
  const C2 = px(u + w, v + d, h);
  const D2 = px(u, v + d, h);
  return {
    top: pts([A2, B2, C2, D2]),
    right: pts([B, C, C2, B2]),
    left: pts([C, D, D2, C2]),
    corners: [A, B, C, D, A2, B2, C2, D2],
  };
}

/** Polyline through grid points, projected. Used for routes and motion paths. */
export function isoPath(points: [number, number][]): string {
  return points
    .map((p, i) => {
      const q = px(p[0], p[1]);
      return `${i === 0 ? "M" : "L"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
    })
    .join(" ");
}

/** Right-angle route between two grid points, bending once. */
export function route(a: [number, number], b: [number, number]): [number, number][] {
  return [a, [b[0], a[1]], b];
}
