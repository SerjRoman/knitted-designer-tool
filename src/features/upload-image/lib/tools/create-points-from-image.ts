import type { PointWithColor, RGBColor } from "@/shared/lib";

export function createPointsFromImage(
	RGBArray: RGBColor[],
	width: number,
	height: number
): PointWithColor[] {
	const points: PointWithColor[] = [];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const RGBColor = RGBArray[y * width + x];
			const color = `rgb(${RGBColor.r}, ${RGBColor.g}, ${RGBColor.b})`;
			points.push({ x, y, color });
		}
	}
	return points;
}
