import { useRef } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { usePanCanvas } from "@/features/pan-canvas";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { useAppSelector } from "@/shared/lib";
import { SelectColor } from "../features/select-color";
import { SelectToolPanel } from "../features/select-tool/ui/index";
import { ChangeNumberColumns } from "../features/change-grid-sizes/ui/index";
import { ChangeNumberRows } from "../features/change-grid-sizes/ui/index";
import { ChangePixelSize } from "../features/change-grid-sizes/ui/index";
import { ActionButtons } from "../features/components/ActionButtons";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { numberColumns, numberRows } = useAppSelector((state) => state.canvas);

  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Canvas Section - Left Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          ref={containerRef}
          className="bg-white rounded-lg shadow-2xl border-2 border-gray-300"
          style={{
            width: "560px",
            height: "560px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CanvasLayer />
          <GridLayer />
          <HorizontalRulerLayer />
          <VerticalRulerLayer />
          <UILayer />
        </div>
      </div>

      {/* Tools Sidebar - Right Side - Scrollable */}
      <div className="w-96 bg-white border-l border-gray-200 shadow-xl overflow-y-auto flex-shrink-0">
        <div className="p-6 space-y-6 pb-12">
          {/* Grid Info */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 text-center shadow-lg">
            <div className="text-sm opacity-90">Grid Size</div>
            <div className="text-3xl font-bold mt-1">
              {numberColumns} × {numberRows}
            </div>
          </div>

          {/* Colors Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <SelectColor />
          </div>

          {/* Tools Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <SelectToolPanel />
          </div>

          {/* Grid Controls */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Grid Controls
            </h3>
            <div className="space-y-4">
              <ChangeNumberColumns />
              <ChangeNumberRows />
              <ChangePixelSize />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
