import { MINI_FONT } from "../constants";
import type { Point } from "../types";

export function getPointsFromText(text: string) {
	const points: Point[] = [];
	for (let il = 0; il < text.length; il++) {
		const letter = text[il];
		const sizes = MINI_FONT[letter];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 3; j++) {
				if (sizes[i * 3 + j] === 0) continue;
				points.push({
					x: j + il * 4,
					y: i,
				});
			}
		}
	}
	return points;
}
