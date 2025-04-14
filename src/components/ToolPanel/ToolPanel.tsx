import "./ToolPanel.scss";
import { Shape, Tool } from "../../enum/canvas.enum";
import { useCanvasStore } from "../../store/canvas-store";
import { shapeCodeLabel, toolCodeLabel } from "../../const/canvas.const";
import ToolIcon from "../ToolIcon/ToolIcon";
import { Undo } from "lucide-react";
import { JSX } from "react";

/**
 * ColorMenu - shows the color options
 */
function ColorMenu(): JSX.Element {
  const { color } = useCanvasStore((state) => state.toolConfig);
  const handleColorClick = useCanvasStore((state) => state.handleColorClick);

  const colorList = [
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
  ];

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
