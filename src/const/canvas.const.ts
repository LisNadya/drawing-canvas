import { Shape, Tool } from "../enum/canvas.enum";
import { CodeLabel } from "../models/canvas.model";

export const toolCodeLabel: CodeLabel[] = [
  {
    code: Tool.Pencil,
    label: "Pencil",
  },
  {
    code: Tool.Bucket,
    label: "Fill",
  },
  {
    code: Tool.Shape,
    label: "Shape",
  },
];

export const shapeCodeLabel: CodeLabel[] = [
  {
    code: Shape.SquareFill,
    label: "Square Fill",
  },
  {
    code: Shape.SquareOutline,
    label: "Square Outline",
  },
  {
    code: Shape.CircleFill,
    label: "Circle Fill",
  },
  {
    code: Shape.CircleOutline,
    label: "Circle Outline",
  },
];
