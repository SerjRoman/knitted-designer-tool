import { Upload, Eye, Crop, Download } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="space-y-3">
      {/* Compact Motif Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
        <div className="text-xs text-blue-700 font-medium">Motif Size</div>
        <div className="text-sm font-bold text-blue-900">48 × 48</div>
      </div>

      {/* Compact Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center gap-1.5 px-2 py-1.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
          <Eye size={12} />
          <span>Preview</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1.5 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors">
          <Crop size={12} />
          <span>Resize</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors">
          <Download size={12} />
          <span>Save</span>
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1.5 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 transition-colors">
          <Upload size={12} />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}
