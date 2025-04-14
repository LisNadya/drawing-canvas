import { Shape } from "../enum/canvas.enum";
import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Square extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.strokeStyle = this.color;

    if (this.shape === Shape.SquareFill) {
      context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
