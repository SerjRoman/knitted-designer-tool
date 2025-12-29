import { useCallback } from "react";
import { drawPreviewPoints } from "@/entities/canvas";
import { clearLineStartPoint, setLineStartPoint } from "@/entities/editor";
import { getLinePoints, useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawLine } from "../model";

export function useLineTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "line" && !toolState.startPoint) {
				dispatch(setLineStartPoint(point));
			}
		},
		[dispatch, toolState]
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
				const points = getLinePoints(toolState.startPoint, point);
				drawPreviewPoints(context, points, pixelSize);
			}
		},
		[toolState, pixelSize]
	);
	const onMouseLeave = useCallback(() => {
		if (toolState.tool === "line" && toolState.startPoint) {
			dispatch(clearLineStartPoint());
		}
	}, [dispatch, toolState]);
	return { onMouseDown, onMouseUp, onDrawPreview, onMouseLeave };
}
