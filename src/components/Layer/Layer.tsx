import { Trash } from "lucide-react";
import { shapeCodeLabel, toolCodeLabel } from "../../const/canvas.const";
import { Shape, Tool } from "../../enum/canvas.enum";
import "./Layer.scss";
import { JSX } from "react";
import ToolIcon from "../ToolIcon/ToolIcon";
import { useCanvasStore } from "../../store/canvas-store";

/**
 * Layer - lists all the elements drawn on the canvas
 */
function Layer(): JSX.Element {
  const canvasObjects = useCanvasStore((state) => state.canvasObjects);
  const deleteCanvasObject = useCanvasStore(
    (state) => state.deleteCanvasObject
  );

  /**
   * mapLabel - maps the code to its label based on the const list
   */
  const mapCodeLabel = (toolCode: Tool | null, shapeCode: Shape): string => {
    if (!toolCode) return "";

    if ([Tool.Bucket, Tool.Pencil].includes(toolCode)) {
      return toolCodeLabel.find(({ code }) => code === toolCode)?.label ?? "";
    }

    return shapeCodeLabel.find(({ code }) => code === shapeCode)?.label ?? "";
  };

  return (
    <div className="layer-menu">
      <h2>Layers</h2>

      {canvasObjects.map((object, i) => {
        return (
          <div key={i} className="item">
            <div className="icon">
              <ToolIcon shape={object.shape} tool={object.tool} size={24} />
            </div>
            <div className="content">
              <p>{mapCodeLabel(object.tool, object.shape)}</p>
              <p>Layer {i + 1}</p>
            </div>
            <button
              className="icon"
              onClick={() => deleteCanvasObject(object.id)}
            >
              <Trash size={24} color="white" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Layer;
