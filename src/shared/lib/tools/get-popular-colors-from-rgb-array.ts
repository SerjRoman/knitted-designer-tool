import type { RGBColor } from "../constants";
import { calculateColorDistance } from "./calculate-color-distance";

export function getPopularColorsFromRGBArray(
	colorsArray: RGBColor[],
	maxColors: number
): RGBColor[] {
	const SIMILARITY_THRESHOLD = 70;
	const colorCounts = new Map<string, { color: RGBColor; count: number }>();
	for (const color of colorsArray) {
		const key = `${color.r},${color.g},${color.b}`;
		if (!colorCounts.has(key)) {
			colorCounts.set(key, { color: color, count: 0 });
		}
		colorCounts.get(key)!.count++;
	}

	const sortedColors = Array.from(colorCounts.values()).sort(
		(a, b) => b.count - a.count
	);

	const palette: RGBColor[] = [];
	for (const popularColorItem of sortedColors) {
		const popularColor = popularColorItem.color;

		let isTooSimilar = false;
		for (const paletteColor of palette) {
			const distance = calculateColorDistance(popularColor, paletteColor);
			if (distance < SIMILARITY_THRESHOLD) {
				isTooSimilar = true;
				break;
			}
		}

		if (!isTooSimilar) {
			palette.push(popularColor);
		}

		if (palette.length >= maxColors) {
			break;
		}
	}

	let i = 0;
	while (palette.length < maxColors && i < sortedColors.length) {
		const colorToAdd = sortedColors[i].color;
		const isInPalette = palette.some(
			(p) =>
				p.r === colorToAdd.r &&
				p.g === colorToAdd.g &&
				p.b === colorToAdd.b
		);
		if (!isInPalette) {
			palette.push(colorToAdd);
		}
		i++;
	}

	return palette;
}
