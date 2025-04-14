import { Shape } from "../enum/canvas.enum";
import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Square extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.shape === Shape.SquareFill) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);

      return;
    }

    context.strokeStyle = this.color;
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
