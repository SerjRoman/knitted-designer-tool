import { Upload, Eye, Crop, Download } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>

        {/* Motif Size Display */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 text-center mb-6 shadow-lg">
          <div className="text-sm opacity-90">Current Motif Size</div>
          <div className="text-2xl font-bold mt-1">48 × 48</div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-3 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
            <Eye size={24} />
            <span className="font-semibold">Preview</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg">
            <Crop size={24} />
            <span className="font-semibold">Resize</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-200 shadow-md hover:shadow-lg">
            <Download size={24} />
            <span className="font-semibold">Save</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg">
            <Upload size={24} />
            <span className="font-semibold">Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
}
