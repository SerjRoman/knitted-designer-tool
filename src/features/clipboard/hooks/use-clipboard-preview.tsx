import { useCallback } from "react";
import { drawClipboardPreview } from "@/entities/canvas";
import { useAppSelector } from "@/shared/lib";
import { type Point } from "@/shared/lib/types";

interface ClipboardPreview {
	draw: ((context: CanvasRenderingContext2D, point: Point) => void) | null;
}

export function useClipboardPreview(): ClipboardPreview {
	const { clipboard } = useAppSelector((state) => state.editor);
	const { pixelSize } = useAppSelector((state) => state.canvas);

	const draw = useCallback(
		(context: CanvasRenderingContext2D, point: Point) => {
			if (!clipboard.points || !clipboard.origin) {
				return;
			}

			const offset = {
				x: point.x - clipboard.origin.x,
				y: point.y - clipboard.origin.y,
			};

			drawClipboardPreview(context, clipboard.points, offset, pixelSize);
		},
		[clipboard.points, clipboard.origin, pixelSize]
	);

	if (!clipboard.points) {
		return { draw: null };
	}

	return { draw };
}
