import {
	BACKGROUND_COLOR,
	RULER_TEXT_COLOR,
	RULER_SIZE,
	RULER_LINE_COLOR,
} from "@/shared/lib";
import { getMajorTickMultiplier } from "./get-major-tick-multiplier";

export function drawHorizontalRulerLayer(
	context: CanvasRenderingContext2D,
	numberOfColumns: number,
	pixelWidth: number,
	scale: number,
	offsets: { x: number; y: number },
) {
	const maxWidth = context.canvas.width;
	context.fillStyle = BACKGROUND_COLOR;

	context.font = `16px sans-serif`;
	context.fillStyle = RULER_TEXT_COLOR;
	context.strokeStyle = RULER_LINE_COLOR;
	context.textAlign = "center";
	context.textBaseline = "middle";

	const tickSpacing = pixelWidth * scale;
	const step = 1;
	const majorTickMultiplier = getMajorTickMultiplier(tickSpacing);

	for (let i = 0; i <= numberOfColumns; i += step) {
		const screenX = offsets.x + i * tickSpacing;
		if (screenX >= maxWidth || offsets.y < 0) continue;
		const isMajorTick =
			i % (step * majorTickMultiplier) === 0 || i === numberOfColumns;
		const tickHeight = isMajorTick ? RULER_SIZE / 2 : RULER_SIZE / 4;

		context.beginPath();
		context.moveTo(screenX, offsets.y);
		context.lineTo(screenX, offsets.y - tickHeight);
		context.stroke();

		if (isMajorTick) {
			context.fillText(String(i), screenX, offsets.y - 30);
		}
	}
}
