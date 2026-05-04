import {
	buildPaintDiff,
	createPaint,
	getPointsFromText,
	selectGrid,
	type PixelFontSize,
} from "@/entities/canva";
import {
	selectCurrentColorId,
	selectCurrentSymbolId,
	selectToolState,
	setClipboardOrigin,
	setClipboardPoints,
	setTool,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { getBoundingBox } from "@/shared/lib/tools/";
import { createAppAsyncThunk } from "@/shared/store";
interface DrawTextPayload {
	text: string;
	size: PixelFontSize;
}
export const drawText = createAppAsyncThunk<void, DrawTextPayload>(
	"canvas/draw-text",
	({ text, size }, { getState, dispatch }) => {
		const state = getState();
		const grid = selectGrid(state);
		const toolState = selectToolState(state);
		const currentColorId = selectCurrentColorId(state);
		const currentSymbolId = selectCurrentSymbolId(state);
		if (toolState.tool !== "insertText") return;
		const pointsToFill = getPointsFromText(text, size);
		const paintDiff = buildPaintDiff({
			points: pointsToFill,
			grid,
			nextPaint: createPaint(currentColorId, currentSymbolId),
		});
		const { maxX, maxY, minX, minY } = getBoundingBox(pointsToFill);
		const centerX = Math.floor((minX + maxX) / 2);
		const centerY = Math.floor((minY + maxY) / 2);
		const originPoint = { x: centerX, y: centerY };

		dispatch(setClipboardPoints(paintDiff.pointsAfter));
		dispatch(setClipboardOrigin(originPoint));
		dispatch(setTool("paste"));
		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore: paintDiff.pointsBefore,
					pointsAfter: paintDiff.pointsAfter,
				},
			}),
		);
	},
);
