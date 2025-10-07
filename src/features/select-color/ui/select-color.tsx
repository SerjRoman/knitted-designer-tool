import { useState } from "react";
import { setCurrentColor } from "@/entities/editor";
import { COLORS, useAppDispatch, useAppSelector } from "@/shared/lib";

export function SelectColor() {
  const dispatch = useAppDispatch();
  const { currentColor } = useAppSelector((state) => state.editor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState(currentColor);

  const colors = Object.values(COLORS);

  const handleSaveColor = () => {
    dispatch(setCurrentColor(customColor));
    setShowColorPicker(false);
  };

  const handleCancel = () => {
    setCustomColor(currentColor);
    setShowColorPicker(false);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
        Colors
      </h3>
      <div className="grid grid-cols-4 gap-1">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded border ${
              currentColor === color
                ? "border-blue-500 ring-1 ring-blue-300"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => dispatch(setCurrentColor(color))}
          />
        ))}
      </div>
      <button
        onClick={() => setShowColorPicker(true)}
        className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
      >
        Edit color
      </button>

      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-64">
            <h3 className="font-medium text-gray-900 mb-3">Edit color</h3>

            <div
              className="w-full h-12 rounded border border-gray-300 mb-3"
              style={{ backgroundColor: customColor }}
            />

            <div className="flex items-center gap-1 mb-3">
              <span className="text-gray-700 text-sm">#</span>
              <input
                type="text"
                value={customColor.replace("#", "").toUpperCase()}
                onChange={(e) => setCustomColor("#" + e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                maxLength={6}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-700">Pick:</span>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-gray-700 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveColor}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
