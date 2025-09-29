import {
	BACKGROUND_COLOR,
	RULER_TEXT_COLOR,
	RULER_SIZE,
	RULER_LINE_COLOR,
} from "@/shared/lib";
import { getMajorTickMultiplier } from "./get-major-tick-multiplier";

export function drawVerticalRulerLayer(
	context: CanvasRenderingContext2D,
	numberRows: number,
	pixelSize: number,
	scale: number,
	offsets: { x: number; y: number }
) {
	context.fillStyle = BACKGROUND_COLOR;

	context.font = "16px sans-serif";
	context.fillStyle = RULER_TEXT_COLOR;
	context.strokeStyle = RULER_LINE_COLOR;
	context.textAlign = "center";
	context.textBaseline = "middle";

	const tickSpacing = pixelSize * scale;
	const step = 1;
	const majorTickMultiplier = getMajorTickMultiplier(tickSpacing);
	for (let i = 0; i <= numberRows; i += step) {
		const screenY = offsets.y + i * tickSpacing;
		if (screenY >= pixelSize * numberRows || offsets.x < 0) continue;

		const isMajorTick = i % (step * majorTickMultiplier) === 0;
		const tickHeight = isMajorTick ? RULER_SIZE / 2 : RULER_SIZE / 4;

		context.beginPath();
		context.moveTo(offsets.x + RULER_SIZE, screenY);
		context.lineTo(offsets.x + RULER_SIZE - tickHeight, screenY);
		context.stroke();

		if (isMajorTick) {
			const gap = i.toString().length >= 3 ? 5 : 10;
			context.fillText(String(i), offsets.x + gap, screenY);
		}
	}
}
