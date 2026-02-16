import type { Point } from "../types";

export function isPointInPoints(point: Point, points: Point[]) {
	return points.some((p) => point.x === p.x && point.y === p.y);
}
