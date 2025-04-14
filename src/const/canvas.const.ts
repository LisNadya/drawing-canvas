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

export const colorList: string[] = [
  "#FFDAB3",
  "#C8AAAA",
  "#9F8383",
  "#574964",
  "#7C444F",
  "#9F5255",
  "#E16A54",
  "#F39E60",
  "#89A8B2",
  "#B3C8CF",
  "#E5E1DA",
  "#F1F0E8",
  "#CCD5AE",
  "#E0E5B6",
  "#FAEDCE",
  "#FEFAE0",
];
