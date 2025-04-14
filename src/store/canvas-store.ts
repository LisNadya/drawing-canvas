import { create } from "zustand";
import { ArtElement, ToolConfig } from "../models/canvas.model";
import { Shape, Tool } from "../enum/canvas.enum";

type State = {
  canvasHistory: ArtElement[][];
  canvasObjects: ArtElement[];
  toolConfig: ToolConfig;
};

type Action = {
  handleToolClick: (value: Tool) => void;
  handleColorClick: (value: string) => void;
  handleShapeClick: (value: Shape) => void;
  addCanvasObject: (value: ArtElement) => void;
  deleteCanvasObject: (value: string) => void;
  undoAction: () => void;
};

export const useCanvasStore = create<State & Action>((set) => ({
  canvasHistory: [],
  canvasObjects: [],
  toolConfig: {
    tool: null,
    color: "#FFDAB3",
    shape: Shape.SquareOutline,
  },
  handleToolClick: (value) =>
    set((prev) => ({
      toolConfig: {
        ...prev.toolConfig,
        tool: prev.toolConfig.tool === value ? null : value,
      },
    })),
  handleColorClick: (value) =>
    set((prev) => ({
      toolConfig: {
        ...prev.toolConfig,
        color: value,
      },
    })),
  handleShapeClick: (value) =>
    set((prev) => ({
      toolConfig: {
        ...prev.toolConfig,
        shape: value,
      },
    })),
  addCanvasObject: (value) =>
    set((prev) => {
      const updatedObjects = [...prev.canvasObjects, value];
      return {
        canvasObjects: updatedObjects,
        canvasHistory: [...prev.canvasHistory, [...prev.canvasObjects]],
      };
    }),
  deleteCanvasObject: (selectedId) =>
    set((prev) => {
      const updatedObjects = [...prev.canvasObjects].filter(
        ({ id }) => selectedId !== id
      );
      return {
        canvasObjects: [...updatedObjects],
        canvasHistory: [...prev.canvasHistory, [...prev.canvasObjects]],
      };
    }),
  undoAction: () =>
    set((prev) => {
      const latestHistory = [...prev.canvasHistory];
      const recentCanvasObjects = latestHistory.pop() ?? [];
      return {
        canvasObjects: recentCanvasObjects,
        canvasHistory: latestHistory,
      };
    }),
}));
