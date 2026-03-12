import { useState, type MouseEvent } from "react";
import { useAppSelector } from "@/shared/store";
import type { Point } from "../types";

export function usePointFromEvent({
	pixelDimensions,
}: {
	pixelDimensions: { width: number; height: number };
}) {
	const [point, setPoint] = useState<Point | null>(null);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const { grid } = useAppSelector((state) => state.canvas);
	const [lastPoint, setLastPoint] = useState<Point | null>(null);
	const updatePointFromEvent = (event: MouseEvent<HTMLCanvasElement>) => {
		if (!(event.target instanceof HTMLCanvasElement)) {
			setPoint(null);
			return;
		}
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor(
			(offsetX - offsets.x) / pixelDimensions.width / scale,
		);
		const gridY = Math.floor(
			(offsetY - offsets.y) / pixelDimensions.height / scale,
		);
		if (grid[gridY]?.[gridX]) {
			setPoint({ x: gridX, y: gridY });
			setLastPoint({ x: gridX, y: gridY });
		} else {
			setPoint(null);
		}
	};
	return { point, updatePointFromEvent, lastPoint };
}
