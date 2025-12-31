import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { clearShapeState, setShapeStartPoint } from "@/entities/editor";
import { getRectPoints } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type {
	PreviewToolHandler,
	ToolHandler,
	ToolHandlers,
	ToolHandlerWithoutPoint,
} from "../lib";
import { drawRect } from "../model";

export function useRectTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions
	);
	const isRect = toolState.tool === "shape" && toolState.shape === "rect";
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (isRect && !toolState.startPoint) {
				dispatch(setShapeStartPoint(point));
			}
		},
		[dispatch, isRect, toolState]
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			if (isRect) {
				dispatch(drawRect(point));
			}
		},
		[dispatch, isRect]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (isRect && toolState.startPoint) {
				const points = getRectPoints(toolState.startPoint, point);
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[isRect, pixelHeigth, pixelWidth, toolState]
	);
	const onMouseLeave: ToolHandlerWithoutPoint = useCallback(() => {
		if (isRect && toolState.startPoint) {
			dispatch(clearShapeState());
		}
	}, [dispatch, isRect, toolState]);
	return { onMouseDown, onMouseUp, onDrawPreview, onMouseLeave };
}
