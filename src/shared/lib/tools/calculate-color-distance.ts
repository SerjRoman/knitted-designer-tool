import type { RGBColor } from "../types";

export function calculateColorDistance(
	color1: RGBColor,
	color2: RGBColor
): number {
	const distance = Math.hypot(
		(color1.r - color2.r),
			(color1.g - color2.g),
			(color1.b - color2.b)
	);
	return distance;
}
