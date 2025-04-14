import { useRef, useEffect, useState, useCallback, JSX } from "react";
import "./Canvas.scss";
import { Shape, Tool } from "../../enum/canvas.enum";
import { ArtElement, Coordinate } from "../../models/canvas.model";
import { Square } from "../../shapes/Square";
import { Circle } from "../../shapes/Circle";
import { Pencil } from "../../shapes/Pencil";
import { Fill } from "../../shapes/Fill";
import { useCanvasStore } from "../../store/canvas-store";

function Canvas(): JSX.Element {
  const { tool, color, shape } = useCanvasStore((state) => state.toolConfig);
  const canvasObjects = useCanvasStore((state) => state.canvasObjects);
  const addCanvasObject = useCanvasStore((state) => state.addCanvasObject);

  const canvasRef: React.RefObject<HTMLCanvasElement | null> = useRef(null);

  // coordinates to capture for shape tool
  const [startCoordinate, setStartCoordinate] = useState<Coordinate | null>(
    null
  );
  // coordinates to capture for freeform tool
  const [pointCoordinates, setPointCoordinates] = useState<Coordinate[]>([]);

  /**
   * rerenderDrawnShapes - rerender all drawn shapes
   */
  const rerenderDrawnShapes = useCallback(
    (context: CanvasRenderingContext2D, canvasObj: DOMRect) => {
      context.clearRect(0, 0, canvasObj.width, canvasObj.height);

      canvasObjects.forEach((obj) => obj.draw(context));
    },
    [canvasObjects]
  );

  useEffect(() => {
    const { canvas, parent } = getCanvasRef();

    if (!parent || !canvas) return;

    // canvas width and height adjusted to fit parent width and height
    // setting via css will offset the coordinates of the cursor
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }, []);

  useEffect(() => {
    const { context, canvasObj } = getCanvasRef();

    if (!context || !canvasObj) return;

    // handles redrawing of the shapes for actions such as deleting layer and undo action
    rerenderDrawnShapes(context, canvasObj);
  }, [canvasObjects, rerenderDrawnShapes]);

  /**
   * getCanvasRef - get references related to the canvas
   */
  function getCanvasRef(): {
    canvas: HTMLCanvasElement | null;
    parent: HTMLElement | null;
    canvasObj: DOMRect | null;
    context: CanvasRenderingContext2D | null;
  } {
    const canvas = canvasRef.current;
    return {
      canvas,
      parent: canvas?.parentElement ?? null,
      canvasObj: canvas?.getBoundingClientRect() ?? null,
      context: canvas?.getContext("2d") ?? null,
    };
  }

  /**
   * handleCanvasOnClick - handle on click event on the canvas
   */
  function handleCanvasOnClick(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void {
    const { parent, context } = getCanvasRef();

    if (!tool || !event || !context || !parent) return;

    if (tool === Tool.Bucket) {
      drawFillObject(parent, context);
      return;
    }
  }

  /**
   * handleCanvasOnMouseDown - handles initial cursor click on the canvas (before cursor drag)
   */
  function handleCanvasOnMouseDown(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void {
    const { canvasObj } = getCanvasRef();

    if (!canvasObj) return;

    const x = event.clientX - canvasObj.left;
    const y = event.clientY - canvasObj.top;

    setCoordinates({ x, y });
  }

  /**
   * handleCanvasOnMouseMove - handles cursor drag on the canvas
   */
  function handleCanvasOnMouseMove(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void {
    handleDrawingObject(event);
  }

  /**
   * handleCanvasOnMouseUp - handles cursor release on the canvas
   */
  function handleCanvasOnMouseUp(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): void {
    handleDrawingObject(event, true);
    setCoordinates();
  }

  /**
   * setCoordinates - save the state of coordinates
   */
  function setCoordinates(coordinate?: Coordinate): void {
    switch (tool) {
      case Tool.Shape:
        setStartCoordinate(coordinate ?? null);
        break;
      case Tool.Pencil:
        setPointCoordinates(coordinate ? [coordinate] : []);
        break;
      default:
        break;
    }
  }

  /**
   * handleDrawingObject - draws object
   */
  function handleDrawingObject(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    saveState: boolean = false
  ): void {
    const { canvasObj, context, parent } = getCanvasRef();

    if (!canvasObj || !context || !parent) return;

    if (tool === Tool.Shape) {
      drawShapeObject(event, context, canvasObj, saveState);
      return;
    }

    if (tool === Tool.Pencil) {
      drawFreeFormObject(event, context, canvasObj, saveState);
      return;
    }
  }

  /**
   * saveCanvasObject - save canvas object state
   */
  function saveCanvasObject(
    object: ArtElement,
    saveState: boolean = true
  ): void {
    if (!saveState) return;

    addCanvasObject(object);
  }

  /**
   * drawFillObject - draws the Fill object
   */
  function drawFillObject(
    parent: HTMLElement,
    context: CanvasRenderingContext2D
  ): void {
    const object = new Fill({
      width: parent.clientWidth,
      height: parent.clientHeight,
      tool,
      color,
    });

    object.draw(context);

    saveCanvasObject(object);
  }

  /**
   * drawShapeObject - draws a new Shape object (Square/ Circle)
   */
  function drawShapeObject(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    context: CanvasRenderingContext2D,
    canvasObj: DOMRect,
    saveState: boolean
  ): void {
    if (!startCoordinate) return;

    const x = event.clientX - canvasObj.left;
    const y = event.clientY - canvasObj.top;

    const properties = {
      x: startCoordinate.x,
      y: startCoordinate.y,
      width: Math.abs(x - startCoordinate.x),
      height: Math.abs(y - startCoordinate.y),
      tool,
      shape,
      color,
    };

    const object = [Shape.CircleFill, Shape.CircleOutline].includes(shape)
      ? new Circle(properties)
      : new Square(properties);

    rerenderDrawnShapes(context, canvasObj);

    object.draw(context);

    saveCanvasObject(object, saveState);
  }

  /**
   * drawFreeFormObject - handles drawing FreeForm object (pencil)
   */
  function drawFreeFormObject(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    context: CanvasRenderingContext2D,
    canvasObj: DOMRect,
    saveState: boolean
  ): void {
    if (!pointCoordinates?.length) return;

    const x = event.clientX - canvasObj.left;
    const y = event.clientY - canvasObj.top;

    setPointCoordinates((prev) => [...prev, { x, y }]);

    const object = new Pencil({
      points: pointCoordinates,
      color,
      shape,
      tool,
    });

    rerenderDrawnShapes(context, canvasObj);

    object.draw(context);

    saveCanvasObject(object, saveState);
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => handleCanvasOnClick(e)}
      onMouseDown={(e) => handleCanvasOnMouseDown(e)}
      onMouseMove={(e) => handleCanvasOnMouseMove(e)}
      onMouseUp={(e) => handleCanvasOnMouseUp(e)}
    ></canvas>
  );
}

export default Canvas;
