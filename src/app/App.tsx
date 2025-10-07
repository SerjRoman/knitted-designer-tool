import { useRef, useState } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { ZoomControls } from "../features/components/ZoomControls";
import { SelectColor } from "../features/select-color";
import { SelectToolPanel } from "../features/select-tool/ui/index";
import { ChangeNumberColumns } from "../features/change-grid-sizes/ui/index";
import { ChangeNumberRows } from "../features/change-grid-sizes/ui/index";
import { ChangePixelSize } from "../features/change-grid-sizes/ui/index";
import { ActionButtons } from "../features/components/ActionButtons";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1.0);
  const [isFitted, setIsFitted] = useState(true);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleFitToCanvas = () => {
    setIsFitted(true);
    setZoom(0.85); // Optimal fit zoom level
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Knitting Design Studio
              </h1>
              <p className="text-gray-600 mt-1">
                Create beautiful knitting patterns with ease
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-600">Grid Size</div>
                <div className="font-semibold text-gray-800">48 × 48</div>
              </div>
              <ZoomControls
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFitToCanvas={handleFitToCanvas}
                isFitted={isFitted}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Canvas Section */}
          <div className="xl:flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Design Canvas
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-blue-700 font-medium">
                      View: {isFitted ? "42×42" : "48×48"} of 48×48
                    </span>
                  </div>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="flex justify-center bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300 overflow-hidden">
                <div
                  ref={containerRef}
                  className="bg-white rounded-lg shadow-inner relative"
                  style={{
                    width: "600px",
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <CanvasLayer />
                    <GridLayer />
                    <HorizontalRulerLayer />
                    <VerticalRulerLayer />
                    <UILayer />
                  </div>

                  {/* Grid boundary indicator */}
                  <div className="absolute inset-2 border-2 border-blue-400 pointer-events-none rounded">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Visible Area
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Sidebar - Scrollable */}
          <div className="xl:w-96">
            <div className="sticky top-32 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
              {/* Colors Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <SelectColor />
              </div>

              {/* Tools Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <SelectToolPanel />
              </div>

              {/* Grid Controls Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Grid Controls
                </h3>
                <div className="space-y-4">
                  <ChangeNumberColumns />
                  <ChangeNumberRows />
                  <ChangePixelSize />
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleFitToCanvas}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        isFitted
                          ? "bg-green-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isFitted ? "✓ Fit to Canvas" : "Fit to Canvas"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <ActionButtons />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
