import {
  GRAPH_EDGES,
  GRAPH_NODES,
  NODE_RADIUS,
  SVG_VIEWBOX,
  nodeById,
  svgX,
  svgY,
} from "@/lib/graph";

/**
 * The flat reading of the same pipeline. Server rendered, so the diagram is
 * legible before any JavaScript runs and stays legible on narrow screens,
 * under reduced motion, and in link previews.
 */
export function ArchitectureSvg({ className }: { className?: string }) {
  const r = NODE_RADIUS * 100;

  return (
    <svg
      viewBox={`0 0 ${SVG_VIEWBOX.w} ${SVG_VIEWBOX.h}`}
      className={className}
      role="img"
      aria-label="Report export pipeline. Client calls API Gateway, which invokes Lambda. Lambda reads DynamoDB and queues work through SQS, which writes to S3. S3 returns a pre-signed URL directly to the client."
    >
      {GRAPH_EDGES.map((edge) => {
        const from = nodeById(edge.from);
        const to = nodeById(edge.to);
        const x1 = svgX(from.x);
        const y1 = svgY(from.y);
        const x2 = svgX(to.x);
        const y2 = svgY(to.y);
        // Trim to the node edge so the line meets the circle, not its centre.
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const tx = (dx / len) * (r + 3);
        const ty = (dy / len) * (r + 3);

        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={x1 + tx}
            y1={y1 + ty}
            x2={x2 - tx}
            y2={y2 - ty}
            stroke={edge.flow ? "var(--color-fg)" : "var(--color-faint)"}
            strokeWidth={edge.flow ? 1.5 : 1.25}
            strokeDasharray={edge.flow ? "7 6" : undefined}
          />
        );
      })}

      {GRAPH_NODES.map((node) => (
        <g key={node.id}>
          <circle
            cx={svgX(node.x)}
            cy={svgY(node.y)}
            r={r}
            fill="var(--color-raise)"
            stroke="var(--color-muted)"
            strokeWidth={1.25}
          />
          <text
            x={svgX(node.x)}
            y={svgY(node.y) + r + 20}
            textAnchor="middle"
            className="font-mono"
            fontSize={12}
            fill="var(--color-muted)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
