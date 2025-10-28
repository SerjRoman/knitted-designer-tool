import { useRef, useEffect } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
<<<<<<< Updated upstream
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";

import { ApplyHistoryBlock } from "@/features/action-history";
=======
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
>>>>>>> Stashed changes
import {
  ChangeNumberColumns,
  ChangeNumberRows,
  ChangePixelSize,
} from "@/features/change-grid-sizes";

import { usePanCanvas } from "@/features/pan-canvas";
import { useCanvasZoom } from "@/features/zoom-canvas";
<<<<<<< Updated upstream

import { useAppSelector, useAppDispatch } from "@/shared/lib";
import { setZoomScale } from "@/entities/viewport";
import { Toolbar } from "../features/components/toolbar";


import { useAppSelector } from "@/shared/lib";
import { ActionButtons } from "../features/components/ActionButtons";
import { SelectColor } from "../features/select-color";


export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { numberColumns, numberRows, pixelSize } = useAppSelector(
    (state) => state.canvas
  );
  const { scale } = useAppSelector((state) => state.viewport);


  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

import { useAppSelector, useAppDispatch } from "@/shared/lib";
=======
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
>>>>>>> Stashed changes
import { setZoomScale } from "@/entities/viewport";
import { ToolPanel } from "@/widgets/tool-panel";
import { SelectColor } from "@/features/select-color";
import { ActionButtons } from "@/features/components/ActionButtons";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { numberColumns, numberRows, pixelSize } = useAppSelector(
    (state) => state.canvas
  );
  const { scale } = useAppSelector((state) => state.viewport);

  useCanvasZoom(containerRef);
  usePanCanvas(containerRef);

<<<<<<< Updated upstream
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


					{/* Actions */}
					<div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
						<ActionButtons />
					</div>
				</div>
			</div>
		</div>
	);

  // Calculate and set initial zoom to fill the entire frame
=======
  // Auto-fit grid on load or resize
>>>>>>> Stashed changes
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
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
      {/* ===== Left: Grid Canvas ===== */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          ref={containerRef}
          className="relative bg-white border border-gray-300 rounded-none shadow-inner overflow-hidden w-full h-full"
        >
          <CanvasLayer />
          <GridLayer />
          <HorizontalRulerLayer />
          <VerticalRulerLayer />
          <UILayer />
        </div>
      </div>

      {/* ===== Right: Tools ===== */}
      <div className="w-[360px] bg-white border-l border-gray-200 shadow-xl overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Grid Info */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 text-center shadow-md">
            <div className="text-sm opacity-90">Grid Size</div>
            <div className="text-3xl font-bold mt-1">
              {numberColumns} × {numberRows}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <SelectColor />
          </div>

          {/* Drawing Tools */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <ToolPanel />
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
<<<<<<< Updated upstream


  return (
    <div>
      <SelectColor />
      <SelectToolPanel />
      <ChangeNumberColumns />
      <ChangeNumberRows />
      <ChangePixelSize />
      <ApplyHistoryBlock />
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: `${900}px`,
          height: `${900}px`,
        }}
      >
        <CanvasLayer />
        <GridLayer />
        <HorizontalRulerLayer />
        <VerticalRulerLayer />
        <UILayer />
      </div>
    </div>
  );


=======
>>>>>>> Stashed changes
}
