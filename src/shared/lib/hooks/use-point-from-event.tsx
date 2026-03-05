import { useState, type MouseEvent } from "react";
import type { Point } from "../types";
import { useAppSelector } from "./use-app-selector";

export function usePointFromEvent() {
	const [point, setPoint] = useState<Point | null>(null);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const { grid, pixelSize } = useAppSelector((state) => state.canvas);

	const updatePointFromEvent = (event: MouseEvent<HTMLCanvasElement>) => {
		if (!(event.target instanceof HTMLCanvasElement)) {
			setPoint(null);
			return;
		}
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor((offsetX - offsets.x) / pixelSize / scale);
		const gridY = Math.floor((offsetY - offsets.y) / pixelSize / scale);
		if (grid[gridY]?.[gridX] !== undefined) {
			setPoint({ x: gridX, y: gridY });
		} else {
			setPoint(null);
		}
	};
	return { point, updatePointFromEvent };
}
