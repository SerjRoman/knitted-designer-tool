import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import {
	clearShapeState,
	selectToolState,
	setShapeStartPoint,
} from "@/entities/editor";
import {
	areTwoPointsEqual,
	getRectPoints,
	useMemoizedCalculation,
} from "@/shared/lib";
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
	const toolState = useAppSelector(selectToolState);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions,
	);
	const isRect = toolState.tool === "shape" && toolState.shape === "rect";
	const getRectPointsToDraw = useMemoizedCalculation(
		getRectPoints,
		(prevArgs, nextArgs) =>
			areTwoPointsEqual(prevArgs[0], nextArgs[0]) &&
			areTwoPointsEqual(prevArgs[1], nextArgs[1]),
	);

	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (isRect && !toolState.startPoint) {
				dispatch(setShapeStartPoint(point));
			}
		},
		[dispatch, isRect, toolState],
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			if (isRect) {
				dispatch(drawRect(point));
			}
		},
		[dispatch, isRect],
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { currentPoint }) => {
			if (isRect && toolState.startPoint && currentPoint) {
				const points = getRectPointsToDraw(
					toolState.startPoint,
					currentPoint,
				);
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[isRect, pixelHeigth, pixelWidth, toolState, getRectPointsToDraw],
	);
	const onMouseLeave: ToolHandlerWithoutPoint = useCallback(() => {
		if (isRect && toolState.startPoint) {
			dispatch(clearShapeState());
		}
	}, [dispatch, isRect, toolState]);
	return { onMouseDown, onMouseUp, onDrawPreview, onMouseLeave };
}
