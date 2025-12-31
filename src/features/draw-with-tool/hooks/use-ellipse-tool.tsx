import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { clearShapeState, setShapeStartPoint } from "@/entities/editor";
import { getEllipsePoints } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type {
	PreviewToolHandler,
	ToolHandler,
	ToolHandlers,
	ToolHandlerWithoutPoint,
} from "../lib";
import { drawEllipse } from "../model";

export function useEllipseTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions
	);
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
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[isEllipse, toolState, pixelWidth, pixelHeigth]
	);
	const onMouseLeave: ToolHandlerWithoutPoint = useCallback(() => {
		if (isEllipse && toolState.startPoint) {
			dispatch(clearShapeState());
		}
	}, [dispatch, isEllipse, toolState]);

	return { onMouseDown, onDrawPreview, onMouseUp, onMouseLeave };
}
