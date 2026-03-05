import { ZoomIn, ZoomOut, Minimize } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToCanvas: () => void;
  isFitted: boolean;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFitToCanvas,
  isFitted,
}: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3">
      <span className="text-sm font-semibold text-gray-700">Zoom</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onZoomOut}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors shadow-sm"
          title="Zoom Out"
        >
          <ZoomOut size={18} className="text-gray-700" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-gray-800 w-16 text-center">
            {(zoom * 100).toFixed(0)}%
          </span>
          {isFitted && (
            <span className="text-xs text-green-600 font-medium">Fitted</span>
          )}
        </div>

        <button
          onClick={onZoomIn}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors shadow-sm"
          title="Zoom In"
        >
          <ZoomIn size={18} className="text-gray-700" />
        </button>

        <button
          onClick={onFitToCanvas}
          className={`p-2 rounded-lg transition-colors shadow-sm ml-2 ${
            isFitted
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          title="Fit to Canvas"
        >
          <Minimize size={18} />
        </button>
      </div>
    </div>
  );
}
