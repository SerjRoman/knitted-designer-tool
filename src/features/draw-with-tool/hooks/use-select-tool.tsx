import { useCallback, useRef } from "react";
import { drawPreviewSelect } from "@/entities/canvas";
import {
	removeSelectedPoint,
	addSelectedPoint,
	clearSelectedPoints,
	setSelectStartPoint,
} from "@/entities/editor";
import { isPointInPoints, useAppDispatch, useAppSelector } from "@/shared/lib";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawSelect } from "../model";

export function useSelectTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { selectedPoints, toolState } = useAppSelector(
		(state) => state.editor
	);
	const pixelSize = useAppSelector((state) => state.canvas.pixelSize);

	const doAddNewPointRef = useRef<boolean>(true);
	const onMouseDown: ToolHandler = useCallback(
		({ event, point }) => {
			if (toolState.tool !== "select") return;
			if (event.shiftKey) {
				if (selectedPoints) {
					doAddNewPointRef.current = !isPointInPoints(
						point,
						selectedPoints
					);
				}

				if (doAddNewPointRef.current) {
					dispatch(removeSelectedPoint(point));
				} else {
					dispatch(addSelectedPoint(point));
				}
			} else {
				if (toolState.startPoint) return;
				dispatch(clearSelectedPoints());
				dispatch(setSelectStartPoint(point));
			}
		},
		[dispatch, selectedPoints, toolState]
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
				if (doAddNewPointRef.current) {
					dispatch(addSelectedPoint(point));
				} else {
					dispatch(removeSelectedPoint(point));
				}
			}
		},
		[dispatch]
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
