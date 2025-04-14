import "./App.scss";
import Canvas from "./components/Canvas/Canvas";
import Layer from "./components/Layer/Layer";
import ToolPanel from "./components/ToolPanel/ToolPanel";

function App() {
  return (
    <div className="main">
      <div className="toolbar">
        <ToolPanel />
      </div>

      <div className="canvas">
        <Canvas />
      </div>

      <div className="layerbar">
        <Layer />
      </div>
    </div>
  );
}

export default App;
