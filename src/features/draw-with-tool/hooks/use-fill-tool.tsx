import { useCallback } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import { getAdjacentPoints } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { fillArea } from "../model";

export function useFillTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { grid } = useAppSelector((state) => state.canvas);
	const { width, height } = useAppSelector(selectPixelDimensions);
	// const { currentColor } = useAppSelector((state) => state.editor);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			dispatch(fillArea(point));
		},
		[dispatch]
	);
	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			const pointsToFill = getAdjacentPoints(point, grid);
			// const color = currentColor
			// 	.replace(")", ", 0.5)")
			// 	.replace("rgb", "rgba");
			drawPreviewPoints(context, pointsToFill, width, height);
		},
		[grid, height, width]
	);

	return {
		onMouseUp,
		onDrawPreview,
	};
}
