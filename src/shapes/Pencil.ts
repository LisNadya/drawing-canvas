import { ArtElement } from "../models/canvas.model";
import { CanvasObject } from "./CanvasObject";

export class Pencil extends CanvasObject {
  constructor(properties: Partial<ArtElement>) {
    super(properties);
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.points.length < 2) return;

    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.lineCap = "round";

    context.beginPath();

    context.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }

    context.stroke();

    context.closePath();
  }
}
