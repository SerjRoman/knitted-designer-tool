import { useCallback } from "react";
import { drawPreviewSelect } from "@/entities/canvas";
import {
	removeSelectedPoint,
	addSelectedPoint,
	clearSelectedPoints,
	setSelectStartPoint,
} from "@/entities/editor";
import {
	isPointInPoints,
	useAppDispatch,
	useAppSelector,
	useDebounce,
} from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawSelect } from "../model";

export function useSelectTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { selectedPoints, toolState } = useAppSelector(
		(state) => state.editor
	);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);

	const debouncedSelectedPoints = useDebounce(
		toolState.tool === "select" ? selectedPoints : null
	);

	const onMouseDown: ToolHandler = useCallback(
		({ event, point }) => {
			if (event.shiftKey) {
				let isPointInSelected = false;
				if (selectedPoints) {
					isPointInSelected = isPointInPoints(point, selectedPoints);
				}

				if (isPointInSelected) {
					dispatch(removeSelectedPoint(point));
				} else {
					dispatch(addSelectedPoint(point));
				}
			} else {
				dispatch(clearSelectedPoints());
				dispatch(setSelectStartPoint(point));
			}
		},
		[dispatch, selectedPoints]
	);
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			dispatch(drawSelect(point));
		},
		[dispatch]
	);
	const onMouseMove: ToolHandler = useCallback(
		({ event, point }) => {
			if (event.shiftKey) {
				if (!debouncedSelectedPoints) return;
				const isPointInSelected = isPointInPoints(
					point,
					debouncedSelectedPoints
				);
				if (isPointInSelected) {
					dispatch(removeSelectedPoint(point));
				} else {
					dispatch(addSelectedPoint(point));
				}
			}
		},
		[debouncedSelectedPoints, dispatch]
	);

	const onDrawPreview: PreviewToolHandler = useCallback(
		(context, { point }) => {
			if (toolState.tool === "select" && toolState.startPoint) {
				drawPreviewSelect(
					context,
					toolState.startPoint,
					point,
					pixelSize
				);
			}
		},
		[pixelSize, toolState]
	);
	return { onMouseDown, onDrawPreview, onMouseMove, onMouseUp };
}
