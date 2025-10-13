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
      {/* Compact Color Grid */}
      <div className="grid grid-cols-4 gap-1">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-6 h-6 rounded border ${
              currentColor === color
                ? "border-blue-500 ring-1 ring-blue-300"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => dispatch(setCurrentColor(color))}
          />
        ))}
      </div>

      {/* Compact Edit Color Button */}
      <button
        onClick={() => setShowColorPicker(true)}
        className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
      >
        Edit color
      </button>

      {/* Color Picker Modal remains the same */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-64">
            {/* ... modal content ... */}
          </div>
        </div>
      )}
    </div>
  );
}
