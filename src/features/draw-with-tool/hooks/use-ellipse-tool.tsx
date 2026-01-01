import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { clearShapeState, setShapeStartPoint } from "@/entities/editor";
import {
	areTwoPointsEqual,
	getEllipsePoints,
	useMemoizedCalculation,
} from "@/shared/lib";
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
	const getEllipsePointsToDraw = useMemoizedCalculation(
		getEllipsePoints,
		(prevArgs, nextArgs) =>
			areTwoPointsEqual(prevArgs[0], nextArgs[0]) &&
			areTwoPointsEqual(prevArgs[1], nextArgs[1])
	);
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
		(context, { currentPoint }) => {
			if (isEllipse && toolState.startPoint && currentPoint) {
				const points = getEllipsePointsToDraw(
					toolState.startPoint,
					currentPoint
				);
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[isEllipse, toolState, pixelWidth, pixelHeigth, getEllipsePointsToDraw]
	);
	const onMouseLeave: ToolHandlerWithoutPoint = useCallback(() => {
		if (isEllipse && toolState.startPoint) {
			dispatch(clearShapeState());
		}
	}, [dispatch, isEllipse, toolState]);

	return { onMouseDown, onDrawPreview, onMouseUp, onMouseLeave };
}
