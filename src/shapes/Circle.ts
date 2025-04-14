import { Shape } from "../enum/canvas.enum";
import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Circle extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();

    context.arc(this.x, this.y, this.getRadius(), 0, Math.PI * 2);

    if (this.shape === Shape.CircleOutline) {
      context.strokeStyle = this.color;
      context.stroke();
    } else {
      context.fillStyle = this.color;
      context.fill();
    }

    context.closePath();
  }

  private getRadius(): number {
    return Math.sqrt(this.width * this.width + this.height * this.height);
  }
}
