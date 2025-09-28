import { useCallback } from "react";
import { drawPreviewLine } from "@/entities/canvas";
import { setLineStartPoint } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawLine } from "../model";

export function useLineTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "line") {
				dispatch(setLineStartPoint(point));
			}
		},
		[dispatch, toolState.tool]
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "line") {
				dispatch(drawLine(point));
			}
		},
		[dispatch, toolState.tool]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (toolState.tool === "line" && toolState.startPoint) {
				drawPreviewLine(
					context,
					toolState.startPoint,
					point,
					pixelSize
				);
			}
		},
		[toolState, pixelSize]
	);
	return { onMouseDown, onMouseUp, onDrawPreview };
}
