// The export pipeline from case study 1, in world units. Shared by the R3F
// scene and the flat SVG fallback so the two never drift apart.
//
// The story the diagram carries: reads go Client -> API Gateway -> Lambda ->
// DynamoDB. Report exports leave that path entirely. A scheduled Lambda queues
// through SQS, writes to S3, and S3 hands the client a pre-signed URL, so the
// gateway is never in the data path for a large payload.

export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export const GRAPH_NODES: GraphNode[] = [
  { id: "client", label: "Client", x: -2.75, y: 0.0 },
  { id: "api", label: "API Gateway", x: -1.15, y: 0.95 },
  { id: "lambda", label: "Lambda", x: 0.35, y: 0.95 },
  { id: "sqs", label: "SQS", x: 1.95, y: 0.95 },
  { id: "dynamo", label: "DynamoDB", x: 0.35, y: -1.1 },
  { id: "s3", label: "S3", x: 2.55, y: -1.1 },
];

export type GraphEdge = {
  from: string;
  to: string;
  /** The pre-signed URL handoff. Drawn dashed and animated, not solid. */
  flow?: boolean;
};

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "client", to: "api" },
  { from: "api", to: "lambda" },
  { from: "lambda", to: "dynamo" },
  { from: "lambda", to: "sqs" },
  { from: "sqs", to: "s3" },
  { from: "s3", to: "client", flow: true },
];

export const NODE_RADIUS = 0.26;

export function nodeById(id: string): GraphNode {
  const node = GRAPH_NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown graph node: ${id}`);
  return node;
}

// SVG projection. 100px per world unit, origin placed so the whole graph plus
// label room fits the 640x340 viewBox.
export const SVG_VIEWBOX = { w: 640, h: 340 };
export const svgX = (x: number) => (x + 3.2) * 100;
export const svgY = (y: number) => (1.6 - y) * 100;
