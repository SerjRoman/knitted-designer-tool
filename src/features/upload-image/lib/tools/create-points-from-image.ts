import type { PointWithCode, RGBColor } from "@/shared/lib";

export function createPointsFromImage(
	RGBArray: RGBColor[],
	width: number,
	height: number,
	colorIdByRGBKey: Map<string, number>,
): PointWithCode[] {
	const points: PointWithCode[] = [];

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const color = RGBArray[y * width + x];
			const key = `${color.r},${color.g},${color.b}`;
			const colorId = colorIdByRGBKey.get(key);

			if (colorId === undefined) {
				throw new Error("Failed to resolve uploaded color id");
			}

			points.push({ x, y, code: colorId });
		}
	}

	return points;
}
