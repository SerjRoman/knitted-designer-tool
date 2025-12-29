import type { Point } from "../types";

export function getLinePoints(p0: Point, p1: Point): Point[] {
	const pixels: Point[] = [];
	let { x: x0, y: y0 } = p0;
	const { x: x1, y: y1 } = p1;

	const dx = Math.abs(x1 - x0);
	const dy = -Math.abs(y1 - y0);

	const sx = x0 < x1 ? 1 : -1;
	const sy = y0 < y1 ? 1 : -1;

	let err = dx + dy;

	while (true) {
		pixels.push({ x: x0, y: y0 });

		if (x0 === x1 && y0 === y1) {
			break;
		}

		const e2 = 2 * err;
		if (e2 >= dy) {
			err += dy;
			x0 += sx;
		}
		if (e2 <= dx) {
			err += dx;
			y0 += sy;
		}
	}

	return pixels;
}
