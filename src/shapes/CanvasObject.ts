import { Tool, Shape } from "../enum/canvas.enum";
import { Coordinate, ArtElement } from "../models/canvas.model";
import { v4 as uuidv4 } from "uuid";

export class CanvasObject implements ArtElement {
  id: string = uuidv4();
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  points: Coordinate[] = [];
  tool: Tool | null = null;
  color: string = "";
  shape: Shape = Shape.SquareFill;

  constructor(properties: Partial<ArtElement>) {
    this.setProperties(properties);
  }

  setProperties(properties: Partial<ArtElement>): void {
    this.width = properties.width ?? 0;
    this.height = properties.height ?? 0;
    this.x = properties.x ?? 0;
    this.y = properties.y ?? 0;
    this.tool = properties.tool ?? null;
    this.points = properties.points ?? [];
    this.color = properties.color ?? "";
    this.shape = properties.shape ?? Shape.SquareFill;
  }

  draw(_context: CanvasRenderingContext2D): void {
    // this is intentional
  }
}
