import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { ToolHandler, ToolHandlers } from "../lib";
import { drawPixel } from "../model";

export function useDrawingTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
	} = useAppSelector((state) => state.editor);
	const handleDrawing: ToolHandler = useCallback(
		({ point }) => {
			if (tool === "brush" || tool === "eraser") {
				dispatch(drawPixel(point));
			}
		},
		[dispatch, tool]
	);

	return { onMouseDown: handleDrawing, onMouseMove: handleDrawing };
}
