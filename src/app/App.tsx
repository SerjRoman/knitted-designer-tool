import { useRef, useEffect } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { usePanCanvas } from "@/features/pan-canvas";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { useAppSelector, useAppDispatch } from "@/shared/lib";
import { setZoomScale } from "@/entities/viewport";
import { Toolbar } from "../features/components/toolbar";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { numberColumns, numberRows, pixelSize } = useAppSelector(
    (state) => state.canvas
  );
  const { scale } = useAppSelector((state) => state.viewport);

  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

  // Calculate and set initial zoom to fill the entire frame
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rulerSize = 30;

    const availableWidth = container.clientWidth - rulerSize;
    const availableHeight = container.clientHeight - rulerSize;

    const gridWidth = numberColumns * pixelSize;
    const gridHeight = numberRows * pixelSize;

    const scaleX = availableWidth / gridWidth;
    const scaleY = availableHeight / gridHeight;
    const fillScale = Math.max(scaleX, scaleY);

    if (Math.abs(scale - fillScale) > 0.1) {
      dispatch(setZoomScale(fillScale));
    }
  }, [numberColumns, numberRows, pixelSize]);

  return (
    <div className="h-screen bg-gray-100">
      {/* Full Canvas Frame - Removed padding and centering */}
      <div ref={containerRef} className="relative bg-white w-full h-full">
        {/* Canvas Layers */}
        <CanvasLayer />
        <GridLayer />
        <HorizontalRulerLayer />
        <VerticalRulerLayer />
        <UILayer />

        {/* Toolbar Component */}
        <Toolbar />
      </div>
    </div>
  );
}
