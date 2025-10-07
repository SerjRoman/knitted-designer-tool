import { useEffect } from "react";
import { copySelection, cutSelection } from "@/features/clipboard";
import { clearClipboard, selectTool } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import {
  Brush,
  Eraser,
  Pipette,
  Minus,
  Square,
  MousePointer,
  Copy,
  Scissors,
  Clipboard,
  Undo,
  FlipVertical,
  FlipHorizontal,
} from "lucide-react";

export function SelectToolPanel() {
  const dispatch = useAppDispatch();
  const {
    toolState: { tool },
    clipboard,
    selectedPoints,
  } = useAppSelector((state) => state.editor);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "c":
            if (selectedPoints && selectedPoints.length > 0) {
              e.preventDefault();
              dispatch(copySelection());
            }
            break;
          case "x":
            if (selectedPoints && selectedPoints.length > 0) {
              e.preventDefault();
              dispatch(cutSelection());
            }
            break;
          case "v":
            if (clipboard) {
              e.preventDefault();
              dispatch(selectTool("paste"));
            }
            break;
        }
      }
      if (e.key === "Escape") {
        if (tool === "paste") {
          dispatch(selectTool("select"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, clipboard, selectedPoints, tool]);

  const ToolButton = ({
    toolName,
    icon: Icon,
    label,
    onClick,
    disabled = false,
  }: {
    toolName: string;
    icon: any;
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
        tool === toolName
          ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105"
          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm"
      } ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 cursor-pointer"
      }`}
      title={label}
    >
      <Icon size={20} />
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Drawing Tools Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Drawing Tools
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <ToolButton
            toolName="brush"
            icon={Brush}
            label="Brush"
            onClick={() => dispatch(selectTool("brush"))}
          />
          <ToolButton
            toolName="line"
            icon={Minus}
            label="Line"
            onClick={() => dispatch(selectTool("line"))}
          />
          <ToolButton
            toolName="rect"
            icon={Square}
            label="Rect"
            onClick={() => dispatch(selectTool("rect"))}
          />
          <ToolButton
            toolName="eraser"
            icon={Eraser}
            label="Eraser"
            onClick={() => dispatch(selectTool("eraser"))}
          />
          <ToolButton
            toolName="colorPicker"
            icon={Pipette}
            label="Picker"
            onClick={() => dispatch(selectTool("colorPicker"))}
          />
          <ToolButton
            toolName="select"
            icon={MousePointer}
            label="Select"
            onClick={() => {
              dispatch(selectTool("select"));
              dispatch(clearClipboard());
            }}
          />
        </div>
      </div>

      {/* Clipboard Tools Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Clipboard
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <ToolButton
            toolName="copy"
            icon={Copy}
            label="Copy"
            onClick={async () => {
              dispatch(selectTool("copy"));
              await dispatch(copySelection());
              dispatch(selectTool("paste"));
            }}
            disabled={!selectedPoints || selectedPoints.length === 0}
          />
          <ToolButton
            toolName="cut"
            icon={Scissors}
            label="Cut"
            onClick={async () => {
              dispatch(selectTool("cut"));
              await dispatch(cutSelection());
              dispatch(selectTool("paste"));
            }}
            disabled={!selectedPoints || selectedPoints.length === 0}
          />
          <ToolButton
            toolName="paste"
            icon={Clipboard}
            label="Paste"
            onClick={() => dispatch(selectTool("paste"))}
            disabled={!clipboard.points}
          />
          <ToolButton
            toolName="undo"
            icon={Undo}
            label="Undo"
            onClick={() => {
              /* Add undo functionality */
            }}
          />
        </div>
      </div>

      {/* Transform Tools Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Transform
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <ToolButton
            toolName="flipVertical"
            icon={FlipVertical}
            label="Flip V"
            onClick={() => {
              /* Add flip vertical */
            }}
            disabled={!selectedPoints || selectedPoints.length === 0}
          />
          <ToolButton
            toolName="flipHorizontal"
            icon={FlipHorizontal}
            label="Flip H"
            onClick={() => {
              /* Add flip horizontal */
            }}
            disabled={!selectedPoints || selectedPoints.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
