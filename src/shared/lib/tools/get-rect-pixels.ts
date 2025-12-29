import type { Point } from "../types";

export function getRectPoints(p0: Point, p1: Point): Point[] {
    const pixels: Point[] = [];

    const minX = Math.min(p0.x, p1.x);
    const maxX = Math.max(p0.x, p1.x);
    const minY = Math.min(p0.y, p1.y);
    const maxY = Math.max(p0.y, p1.y);

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            pixels.push({ x, y });
        }
    }

    return pixels;
}
