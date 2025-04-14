import { Shape } from "../enum/canvas.enum";
import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Circle extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.strokeStyle = this.color;

    context.beginPath();

    context.arc(this.x, this.y, this.getRadius(), 0, Math.PI * 2);

    if (this.shape === Shape.CircleOutline) {
      context.stroke();
    } else {
      context.fill();
    }

    context.closePath();
  }

  private getRadius(): number {
    const startX = this.x;
    const startY = this.y;
    const endX = this.x + this.width;
    const endY = this.y + this.height;

    const deltaX = startX - endX;
    const deltaY = startY - endY;

    const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return radius;
  }
}
