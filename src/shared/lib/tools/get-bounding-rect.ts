import type { Point } from "../types";

export function getBoundingBox(points: Point[]) {
	if (points.length === 0) {
		return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
	}
	let minX = points[0].x,
		minY = points[0].y,
		maxX = points[0].x,
		maxY = points[0].y;
	for (const p of points) {
		if (p.x < minX) minX = p.x;
		if (p.y < minY) minY = p.y;
		if (p.x > maxX) maxX = p.x;
		if (p.y > maxY) maxY = p.y;
	}
	return { minX, minY, maxX, maxY };
}
