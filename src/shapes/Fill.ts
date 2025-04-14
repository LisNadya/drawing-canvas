import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Fill extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(0, 0, this.width, this.height);
  }
}
