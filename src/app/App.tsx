import { useRef, useEffect, useCallback } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";

import { ApplyHistoryBlock } from "@/features/action-history";
import {
  ChangeNumberColumns,
  ChangeNumberRows,
  ChangePixelSize,
} from "@/features/change-grid-sizes";

import { usePanCanvas } from "@/features/pan-canvas";
import { useCanvasZoom } from "@/features/zoom-canvas";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setZoomScale } from "@/entities/viewport";
import { SelectToolPanel } from "@/features/select-tool/ui/select-tool-panel/select-tool-panel";
import { SelectColor } from "@/features/select-color";
import { ActionButtons } from "@/features/components/ActionButtons";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { numberColumns, numberRows, pixelSize } = useAppSelector(
    (state) => state.canvas
  );
  const { scale } = useAppSelector((state) => state.viewport);

  // Initialize zoom and pan hooks
  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

  // Zoom functions
  const zoomIn = useCallback(() => {
    dispatch(setZoomScale(Math.min(scale * 1.2, 10))); // Max zoom 1000%
  }, [dispatch, scale]);

  const zoomOut = useCallback(() => {
    dispatch(setZoomScale(Math.max(scale / 1.2, 0.1))); // Min zoom 10%
  }, [dispatch, scale]);

  const resetZoom = useCallback(() => {
    // Calculate initial fit scale
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rulerSize = 30;
    const availableWidth = container.clientWidth - rulerSize;
    const availableHeight = container.clientHeight - rulerSize;
    const gridWidth = numberColumns * pixelSize;
    const gridHeight = numberRows * pixelSize;

    const scaleX = availableWidth / gridWidth;
    const scaleY = availableHeight / gridHeight;
    const fillScale = Math.min(Math.max(scaleX, scaleY, 0.1), 10); // Clamp between 10% and 1000%

    dispatch(setZoomScale(fillScale));
  }, [dispatch, numberColumns, numberRows, pixelSize]);

  // Auto-fit grid on load
  useEffect(() => {
    resetZoom();
  }, [resetZoom]);

  // Add keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "=":
          case "+":
            e.preventDefault();
            zoomIn();
            break;
          case "-":
            e.preventDefault();
            zoomOut();
            break;
          case "0":
            e.preventDefault();
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom]);

  // Handle wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [zoomIn, zoomOut]);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-6">
      {/* Main Content Container */}
      <div className="flex items-start gap-4 max-w-[1400px] w-full">
        {/* Canvas Area - Centered */}
        <div className="flex-1 flex justify-center">
          <div
            ref={containerRef}
            className="relative bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
              width: "800px",
              height: "600px",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <CanvasLayer />
            <GridLayer />
            <HorizontalRulerLayer />
            <VerticalRulerLayer />
            <UILayer />

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={zoomOut}
                className="bg-white border border-gray-300 rounded p-2 shadow-sm hover:bg-gray-50 w-10 h-10 flex items-center justify-center"
                title="Zoom Out (Ctrl + -)"
              >
                −
              </button>
              <button
                onClick={resetZoom}
                className="bg-white border border-gray-300 rounded px-3 py-2 shadow-sm hover:bg-gray-50 text-sm"
                title="Reset Zoom (Ctrl + 0)"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={zoomIn}
                className="bg-white border border-gray-300 rounded p-2 shadow-sm hover:bg-gray-50 w-10 h-10 flex items-center justify-center"
                title="Zoom In (Ctrl + +)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Tools Panel - Right Side */}
        <div className="w-80 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
            {/* Grid Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 text-center">
              <div className="text-sm opacity-90">Grid Size</div>
              <div className="text-2xl font-bold mt-1">
                {numberColumns} × {numberRows}
              </div>
              <div className="text-xs mt-2 opacity-80">
                Zoom: {Math.round(scale * 100)}%
              </div>
            </div>

            {/* Quick Zoom Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Zoom
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={zoomOut}
                  className="bg-gray-100 border border-gray-300 rounded p-2 text-sm hover:bg-gray-200"
                >
                  Zoom Out
                </button>
                <button
                  onClick={resetZoom}
                  className="bg-gray-100 border border-gray-300 rounded p-2 text-sm hover:bg-gray-200"
                >
                  Reset
                </button>
                <button
                  onClick={zoomIn}
                  className="bg-gray-100 border border-gray-300 rounded p-2 text-sm hover:bg-gray-200"
                >
                  Zoom In
                </button>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Ctrl + Scroll to zoom • Ctrl + 0 to reset
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Colors
              </h3>
              <SelectColor />
            </div>

            {/* Drawing Tools */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Tools
              </h3>
              <SelectToolPanel />
            </div>

            {/* Grid Controls */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Grid Controls
              </h3>
              <div className="space-y-3">
                <ChangeNumberColumns />
                <ChangeNumberRows />
                <ChangePixelSize />
              </div>
            </div>

            {/* History Actions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                History
              </h3>
              <ApplyHistoryBlock />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Actions
              </h3>
              <ActionButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
