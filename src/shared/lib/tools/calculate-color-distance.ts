import type { RGBColor } from "../constants";

export function calculateColorDistance(
	color1: RGBColor,
	color2: RGBColor
): number {
	const distance = Math.sqrt(
		(color1.r - color2.r) ** 2 +
			(color1.g - color2.g) ** 2 +
			(color1.b - color2.b) ** 2
	);
	return distance;
}
