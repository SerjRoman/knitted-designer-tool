import type { RGBColor } from "react-color";
import { SIMILARITY_THRESHOLD } from "../constants";
import { calculateColorDistance } from "./calculate-color-distance";

export function approximateColors(
	initialColors: RGBColor[],
	colorsToApproximate: RGBColor[]
) {
	const approximatedColors: RGBColor[] = [...initialColors];
	for (const colorToApproximate of colorsToApproximate) {
		if (approximatedColors.length > 11) {
			break;
		}
		let minDistance = Infinity;
		for (const initialColor of initialColors) {
			const distance = calculateColorDistance(
				initialColor,
				colorToApproximate
			);
			if (distance < minDistance) {
				minDistance = distance;
			}
		}
		if (minDistance > SIMILARITY_THRESHOLD) {
			approximatedColors.push(colorToApproximate);
		}
	}
	return approximatedColors;
}
