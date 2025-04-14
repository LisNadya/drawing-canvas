import { Pencil, PaintBucket, Square, Circle } from "lucide-react";
import { JSX } from "react";
import { Shape, Tool } from "../../enum/canvas.enum";

/**
 * ToolIcon - returns the icon based on the selected tool and shape
 */
function ToolIcon({
  shape,
  tool,
  size,
}: {
  shape: Shape;
  tool: Tool | null;
  size: number;
}): JSX.Element {
  switch (true) {
    case tool === Tool.Pencil:
      return <Pencil size={size} color="white" />;
    case tool === Tool.Bucket:
      return <PaintBucket size={size} color="white" />;
    case tool === Tool.Shape && shape === Shape.SquareOutline:
      return <Square size={size} color="white" />;
    case tool === Tool.Shape && shape === Shape.SquareFill:
      return <Square size={size} fill="white" strokeWidth={0} />;
    case tool === Tool.Shape && shape === Shape.CircleOutline:
      return <Circle size={size} color="white" />;
    case tool === Tool.Shape && shape === Shape.CircleFill:
      return <Circle size={size} fill="white" strokeWidth={0} />;
    default:
      return <></>;
  }
}

export default ToolIcon;
