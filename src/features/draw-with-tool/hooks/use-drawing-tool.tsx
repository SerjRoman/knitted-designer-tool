import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector, type Point } from "@/shared/lib";
import type { ToolHandler, ToolHandlers } from "../lib";
import { completeBrushStroke, drawPixel } from "../model";

export function useDrawingTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
	} = useAppSelector((state) => state.editor);

	const strokePointsRef = useRef<Point[]>([]);
	const lastPointRef = useRef<Point>(null);

	const handleMouseDown: ToolHandler = useCallback(
		({ point }) => {
			lastPointRef.current = point;
			strokePointsRef.current = [point];
			if (tool === "brush" || tool === "eraser") {
				dispatch(drawPixel(point));
			}
		},
		[dispatch, tool]
	);
	const handleMouseMove: ToolHandler = useCallback(
		({ point }) => {
			if (tool !== "brush" && tool !== "eraser") return;
			if (
				lastPointRef.current?.x === point.x &&
				lastPointRef.current?.y === point.y
			) {
				return;
			}
			lastPointRef.current = point;
			strokePointsRef.current.push(point);
			dispatch(drawPixel(point));
		},
		[dispatch, tool]
	);
	const handleMouseUp: ToolHandler = useCallback(() => {
		console.log(strokePointsRef.current);
		if (strokePointsRef.current.length <= 0) return;
		dispatch(completeBrushStroke(strokePointsRef.current));

		strokePointsRef.current = [];
		lastPointRef.current = null;
	}, [dispatch]);

	return {
		onMouseDown: handleMouseDown,
		onMouseMove: handleMouseMove,
		onMouseUp: handleMouseUp,
	};
}
