import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { clearLineStartPoint, setLineStartPoint } from "@/entities/editor";
import { getLinePoints } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawLine } from "../model";

export function useLineTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions
	);
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
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[toolState, pixelWidth, pixelHeigth]
	);
	const onMouseLeave = useCallback(() => {
		if (toolState.tool === "line" && toolState.startPoint) {
			dispatch(clearLineStartPoint());
		}
	}, [dispatch, toolState]);
	return { onMouseDown, onMouseUp, onDrawPreview, onMouseLeave };
}
