import { useCallback } from "react";
import { drawClipboardPreview } from "@/entities/canvas";
import { clearClipboard, clearSelectedPoints } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { type Point } from "@/shared/lib/types";

interface ClipboardPreview {
	draw: ((context: CanvasRenderingContext2D, point: Point) => void) | null;
	clear: (() => void) | null;
}

export function useClipboardPreview(): ClipboardPreview {
	const { clipboard } = useAppSelector((state) => state.editor);
	const { pixelSize, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
	const dispatch = useAppDispatch();
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
				pixelSize,
				numberColumns,
				numberRows
			);
		},
		[clipboard, pixelSize, numberColumns, numberRows]
	);

	if (!clipboard.points) {
		return { draw: null, clear: null };
	}
	function clear() {
		dispatch(clearSelectedPoints());
		dispatch(clearClipboard());
	}

	return { draw, clear };
}
