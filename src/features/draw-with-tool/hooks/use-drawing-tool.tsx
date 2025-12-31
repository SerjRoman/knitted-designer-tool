import { useCallback, useRef } from "react";
import { type Point } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type {
	ToolHandler,
	ToolHandlers,
	ToolHandlerWithoutPoint,
} from "../lib";
import { completeBrushStroke, drawPixel } from "../model";

export function useDrawingTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
	} = useAppSelector((state) => state.editor);

	const lastPointRef = useRef<Point>(null);
	const handleMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (tool !== "brush" && tool !== "eraser") return;
			lastPointRef.current = point;
			dispatch(drawPixel(point));
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
			dispatch(drawPixel(point));
		},
		[dispatch, tool]
	);
	const handleMouseUp: ToolHandler = useCallback(() => {
		dispatch(completeBrushStroke());

		lastPointRef.current = null;
	}, [dispatch]);

	const onMouseLeave: ToolHandlerWithoutPoint = useCallback(() => {
		lastPointRef.current = null;
	}, []);

	return {
		onMouseDown: handleMouseDown,
		onMouseMove: handleMouseMove,
		onMouseUp: handleMouseUp,
		onMouseLeave,
	};
}
