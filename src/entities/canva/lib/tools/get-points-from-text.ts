import type { Point } from "@/shared/lib";
import { FONT_SIZES, PIXEL_FONTS } from "../constants/pixel-font";
import type { PixelFontSize } from "../types/pixel-font-size";

export function getPointsFromText(text: string, size: PixelFontSize): Point[] {
	console.log("Getting points from text:", { text, size });
	const points: Point[] = [];
	const baseSize = FONT_SIZES[size];
	let currentX = 0;

	for (let il = 0; il < text.length; il++) {
		const letter = text[il];
		const pixelLetter = PIXEL_FONTS[size][letter];

		if (!pixelLetter) {
			currentX += baseSize.width + 1;
			continue;
		}

		const letterWidth = pixelLetter.length / baseSize.height;

		for (let i = 0; i < baseSize.height; i++) {
			for (let j = 0; j < letterWidth; j++) {
				if (pixelLetter[i * letterWidth + j] === 0) continue;
				points.push({
					x: currentX + j,
					y: i,
				});
			}
		}

		currentX += letterWidth + 1;
	}
	return points;
}
