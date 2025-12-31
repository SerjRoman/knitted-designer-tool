import { useCallback } from "react";
import { drawClipboardPreview, selectPixelDimensions } from "@/entities/canvas";
import { clearClipboard, clearSelectedPoints } from "@/entities/editor";
import { type Point } from "@/shared/lib/types";
import { useAppSelector, useAppDispatch } from "@/shared/store";

interface ClipboardPreview {
	draw: ((context: CanvasRenderingContext2D, point: Point) => void) | null;
	clear: (() => void) | null;
}

export function useClipboardPreview(): ClipboardPreview {
	const { clipboard } = useAppSelector((state) => state.editor);
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas
	);
	const { width: pixelWidth, height: pixelHeight } = useAppSelector(
		selectPixelDimensions
	);
	const dispatch = useAppDispatch();
	const clear = useCallback(() => {
		dispatch(clearSelectedPoints());
		dispatch(clearClipboard());
	}, [dispatch]);
	const draw = useCallback(
		(context: CanvasRenderingContext2D, point: Point) => {
			if (!clipboard.points || !clipboard.origin) {
				return;
			}

			const offset = {
				x: point.x - clipboard.origin.x,
				y: point.y - clipboard.origin.y,
			};

			drawClipboardPreview(
				context,
				clipboard.points,
				offset,
				pixelWidth,
				pixelHeight,
				numberOfColumns,
				numberOfRows
			);
		},
		[clipboard, pixelWidth, pixelHeight, numberOfColumns, numberOfRows]
	);

	if (!clipboard.points) {
		return { draw: null, clear: null };
	}

	return { draw, clear };
}
