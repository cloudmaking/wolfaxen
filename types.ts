export interface InquiryData {
  name: string;
  company: string;
  email: string;
  challenges: string;
}

export enum ConnectionState {
  DISCONNECTED = "DISCONNECTED",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  ERROR = "ERROR",
}

export interface GraphNode {
  id: string;
  label: string;
  type: "start" | "process" | "decision" | "end";
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface ProcessGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  summary?: string;
  improvements?: string[];
  bottlenecks?: string[]; // Added specifically for the new analysis section
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  graph: ProcessGraph;
  label: string;
}

export interface UserState {
  isLoggedIn: boolean;
  usageCount: number;
  isSubscribed: boolean;
}
