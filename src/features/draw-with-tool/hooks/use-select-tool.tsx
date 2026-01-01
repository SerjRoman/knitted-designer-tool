import { useCallback, useRef } from "react";
import { drawPreviewPoints, selectPixelDimensions } from "@/entities/canvas";
import {
	removeSelectedPoint,
	addSelectedPoint,
	clearSelectedPoints,
	setSelectStartPoint,
} from "@/entities/editor";
import {
	areTwoPointsEqual,
	getRectPoints,
	isPointInPoints,
	useMemoizedCalculation,
} from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { PreviewToolHandler, ToolHandler, ToolHandlers } from "../lib";
import { drawSelect } from "../model";

export function useSelectTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const { selectedPoints, toolState } = useAppSelector(
		(state) => state.editor
	);
	const { width: pixelWidth, height: pixelHeigth } = useAppSelector(
		selectPixelDimensions
	);
	const getRectPointsToDraw = useMemoizedCalculation(
		getRectPoints,
		(prevArgs, nextArgs) =>
			areTwoPointsEqual(prevArgs[0], nextArgs[0]) &&
			areTwoPointsEqual(prevArgs[1], nextArgs[1])
	);

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
		(context, { currentPoint }) => {
			if (toolState.tool !== "select") {
				return;
			}
			if (selectedPoints) {
				drawPreviewPoints(
					context,
					selectedPoints,
					pixelWidth,
					pixelHeigth
				);
			} else if (
				!selectedPoints &&
				toolState.startPoint &&
				currentPoint
			) {
				const points = getRectPointsToDraw(
					toolState.startPoint,
					currentPoint
				);
				drawPreviewPoints(context, points, pixelWidth, pixelHeigth);
			}
		},
		[
			pixelHeigth,
			pixelWidth,
			selectedPoints,
			toolState,
			getRectPointsToDraw,
		]
	);
	const onMouseLeave: ToolHandler = useCallback(
		({ point }) => {
			if (toolState.tool === "select" && toolState.startPoint) {
				dispatch(drawSelect(point));
			}
		},
		[dispatch, toolState]
	);
	return { onMouseDown, onDrawPreview, onMouseMove, onMouseUp, onMouseLeave };
}
