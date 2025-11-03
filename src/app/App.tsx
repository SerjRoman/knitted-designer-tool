"use client";

import { useRef, useEffect } from "react";
import { ActionButtonsBlock } from "@/widgets/action-buttons-block";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { ToolPanel } from "@/widgets/tool-panel";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { ChangeGridSizes, ChangePixelSize } from "@/features/change-grid-sizes";
import { usePanCanvas } from "@/features/pan-canvas";
import { SelectColor } from "@/features/select-color";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { useAppSelector } from "@/shared/lib";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { numberColumns, numberRows } = useAppSelector((state) => state.canvas);

  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

  // 🧭 Automatically zoom the canvas to fit the whole area on load
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scaleX = container.clientWidth / (numberColumns * 10);
      const scaleY = container.clientHeight / (numberRows * 10);
      const zoom = Math.min(scaleX, scaleY);
      container.style.transform = `scale(${zoom})`;
      container.style.transformOrigin = "top left";
    }
  }, [numberColumns, numberRows]);

  return (
    <div className="h-screen w-screen flex bg-white overflow-hidden">
      {/* Main Layout: Full width */}
      <div className="flex flex-1">
        {/* Canvas Area — takes all available space */}
        <div className="flex-1 relative overflow-hidden">
          <div ref={containerRef} className="absolute inset-0 bg-white">
            <CanvasLayer />
            <GridLayer />
            <HorizontalRulerLayer />
            <VerticalRulerLayer />
            <UILayer />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 h-screen overflow-y-auto p-6 bg-white border-l border-gray-200 shadow-lg space-y-6">
          {/* Grid Info */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-sm opacity-90">Grid Size</div>
            <div className="text-3xl font-bold mt-1 tracking-wide">
              {numberColumns} × {numberRows}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Colors</h3>
            <SelectColor />
          </div>

          {/* Tools */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Tools</h3>
            <ToolPanel />
          </div>

          {/* Grid Controls */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Grid Controls
            </h3>
            <div className="space-y-4">
              <ChangeGridSizes />
              <ChangePixelSize />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <ActionButtonsBlock />
          </div>
        </div>
      </div>
    </div>
  );
}
