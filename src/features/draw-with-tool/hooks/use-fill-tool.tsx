import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import {
	areTwoPointsEqual,
	getAdjacentPoints,
	useMemoizedCalculation,
} from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { fillArea } from "../model";

export function useFillTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { grid } = useAppSelector((state) => state.canvas);
	const { width, height } = useAppSelector(selectPixelDimensions);
	const getAdjacentPointsToDraw = useMemoizedCalculation(
		getAdjacentPoints,
		(prevArgs, nextArgs) => areTwoPointsEqual(prevArgs[0], nextArgs[0])
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			dispatch(fillArea(point));
		},
		[dispatch]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { currentPoint }) => {
			if (!currentPoint) return;
			const pointsToFill = getAdjacentPointsToDraw(currentPoint, grid);
			drawPreviewPoints(context, pointsToFill, width, height);
		},
		[getAdjacentPointsToDraw, grid, height, width]
	);

	return {
		onMouseUp,
		onDrawPreview,
	};
}
