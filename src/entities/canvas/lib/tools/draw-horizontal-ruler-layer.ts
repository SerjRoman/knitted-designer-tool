import {
	BACKGROUND_COLOR,
	RULER_TEXT_COLOR,
	RULER_SIZE,
	RULER_LINE_COLOR,
} from "@/shared/lib";
import { CANVAS_WIDTH } from "../../model";
import { getMajorTickMultiplier } from "./get-major-tick-multiplier";

export function drawHorizontalRulerLayer(
	context: CanvasRenderingContext2D,
	numberColumns: number,
	pixelSize: number,
	scale: number,
	offsets: { x: number; y: number }
) {
	context.fillStyle = BACKGROUND_COLOR;

	context.font = `16px sans-serif`;
	context.fillStyle = RULER_TEXT_COLOR;
	context.strokeStyle = RULER_LINE_COLOR;
	context.textAlign = "center";
	context.textBaseline = "middle";

	const tickSpacing = pixelSize * scale;
	const step = 1;
	const majorTickMultiplier = getMajorTickMultiplier(tickSpacing);

	for (let i = 0; i <= numberColumns; i += step) {
		const screenX = offsets.x + i * tickSpacing;
		if (screenX >= CANVAS_WIDTH || offsets.y < 0) continue;
		const isMajorTick = i % (step * majorTickMultiplier) === 0;
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
