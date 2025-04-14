import "./ToolPanel.scss";
import { Shape, Tool } from "../../enum/canvas.enum";
import { useCanvasStore } from "../../store/canvas-store";
import {
  colorList,
  shapeCodeLabel,
  toolCodeLabel,
} from "../../const/canvas.const";
import ToolIcon from "../ToolIcon/ToolIcon";
import { Undo } from "lucide-react";
import { JSX } from "react";

/**
 * ColorMenu - shows the color options
 */
function ColorMenu(): JSX.Element {
  const { color } = useCanvasStore((state) => state.toolConfig);
  const handleColorClick = useCanvasStore((state) => state.handleColorClick);

  return (
    <div className="section">
      <h2>Colours</h2>
      <div className="color-tool">
        {colorList.map((colorChoice, i) => {
          return (
            <div
              key={i}
              className={`option ${color === colorChoice ? "selected" : ""}`}
              style={{ background: colorChoice }}
              onClick={() => handleColorClick(colorChoice)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * ShapeMenu - shows the shape options
 */
function ShapeMenu(): JSX.Element {
  const { shape } = useCanvasStore((state) => state.toolConfig);
  const handleShapeClick = useCanvasStore((state) => state.handleShapeClick);

  return (
    <div className="section">
      <h2>Shapes</h2>
      <div className="shape-tool">
        {shapeCodeLabel.map((shapeDetail, i) => {
          return (
            <button
              key={i}
              className={`option ${
                shape === (shapeDetail.code as Shape) ? "selected" : ""
              }`}
              onClick={() => handleShapeClick(shapeDetail.code as Shape)}
            >
              <ToolIcon
                shape={shapeDetail.code as Shape}
                tool={Tool.Shape}
                size={48}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * SubToolbar - shows the sub tool bar
 */
function SubToolbar(): JSX.Element {
  const { tool } = useCanvasStore((state) => state.toolConfig);

  if (!tool) return <></>;

  return (
    <div className="property-menu">
      <ColorMenu />
      {tool === Tool.Shape && <ShapeMenu />}
    </div>
  );
}

/**
 * Toolbar - shows the main tool bar
 */
function Toolbar(): JSX.Element {
  const { tool, shape } = useCanvasStore((state) => state.toolConfig);
  const handleToolClick = useCanvasStore((state) => state.handleToolClick);
  const undoAction = useCanvasStore((state) => state.undoAction);

  return (
    <div className="tool-menu">
      <h2>Tools</h2>
      {toolCodeLabel.map((toolDetail, i) => {
        return (
          <button
            key={i}
            className={`option ${
              tool === (toolDetail.code as Tool) ? "selected" : ""
            }`}
            onClick={() => handleToolClick(toolDetail.code as Tool)}
          >
            <ToolIcon shape={shape} tool={toolDetail.code as Tool} size={24} />
          </button>
        );
      })}

      <button className="option" onClick={() => undoAction()}>
        <Undo size={24} color="white" />
      </button>
    </div>
  );
}

/**
 * ToolPanel - holds the tool and sub tool panel
 */
function ToolPanel(): JSX.Element {
  return (
    <div className="menu">
      <Toolbar />
      <SubToolbar />
    </div>
  );
}

export default ToolPanel;
