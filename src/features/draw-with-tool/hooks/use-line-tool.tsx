import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { clearLineStartPoint, setLineStartPoint } from "@/entities/editor";
import {
	areTwoPointsEqual,
	getLinePoints,
	useMemoizedCalculation,
} from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawLine } from "../model";

export function useLineTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions
	);
	const getLinePointsToDraw = useMemoizedCalculation(
		getLinePoints,
		(prevArgs, nextArgs) =>
			areTwoPointsEqual(prevArgs[0], nextArgs[0]) &&
			areTwoPointsEqual(prevArgs[1], nextArgs[1])
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
		(context, { currentPoint }) => {
			if (
				toolState.tool === "line" &&
				toolState.startPoint &&
				currentPoint
			) {
				const points = getLinePointsToDraw(
					toolState.startPoint,
					currentPoint
				);
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[toolState, pixelWidth, pixelHeigth, getLinePointsToDraw]
	);
	const onMouseLeave = useCallback(() => {
		if (toolState.tool === "line" && toolState.startPoint) {
			dispatch(clearLineStartPoint());
		}
	}, [dispatch, toolState]);
	return { onMouseDown, onMouseUp, onDrawPreview, onMouseLeave };
}
