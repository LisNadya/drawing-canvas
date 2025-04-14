import { Shape, Tool } from "../enum/canvas.enum";

export interface ToolConfig {
  tool: Tool | null;
  color: string;
  shape: Shape;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ArtElement extends Coordinate, ToolConfig {
  id: string;
  width: number;
  height: number;
  points: Coordinate[];

  draw: (context: CanvasRenderingContext2D) => void;
}

export interface CodeLabel {
  code: Tool | Shape;
  label: string;
}
