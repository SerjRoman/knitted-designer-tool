import { useCallback } from "react";
import { drawPreviewPoints } from "@/entities/canvas";
import { setShapeStartPoint } from "@/entities/editor";
import { getEllipsePoints, useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawEllipse } from "../model";

export function useEllipseTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const { pixelSize } = useAppSelector((state) => state.canvas);
	const isEllipse =
		toolState.tool === "shape" && toolState.shape === "ellipse";
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (isEllipse && !toolState.startPoint) {
				dispatch(setShapeStartPoint(point));
			}
		},
		[dispatch, isEllipse, toolState]
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			if (isEllipse) {
				dispatch(drawEllipse(point));
			}
		},
		[dispatch, isEllipse]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (isEllipse && toolState.startPoint) {
				const points = getEllipsePoints(toolState.startPoint, point);
				drawPreviewPoints(context, points, pixelSize);
			}
		},
		[isEllipse, toolState, pixelSize]
	);

	return { onMouseDown, onDrawPreview, onMouseUp };
}
