import type {
	BrushState,
	LineState,
	ColorPickerState,
	EraserState,
	EditorToolState,
	EditorTools,
	SelectState,
	CopyState,
	PasteState,
	CutState,
	FillState,
	ShapeState,
} from "../types";

const brushInitialState: BrushState = {
	tool: "brush",
	strokedPoints: null,
};
const eraserInitialState: EraserState = {
	tool: "eraser",
	strokedPoints: null,
};
const colorPickerInitialState: ColorPickerState = { tool: "colorPicker" };
const copyInitialState: CopyState = { tool: "copy" };
const cutInitialState: CutState = { tool: "cut" };
const pasteInitialState: PasteState = { tool: "paste" };
const lineInitialState: LineState = { tool: "line", startPoint: null };
const shapeInitialState: ShapeState = {
	tool: "shape",
	startPoint: null,
	shape: null,
};
const selectInitialState: SelectState = {
	tool: "select",
	startPoint: null,
};
const fillInitialState: FillState = { tool: "fill" };

export const toolInitialStates: Record<EditorTools, EditorToolState> = {
	brush: brushInitialState,
	line: lineInitialState,
	shape: shapeInitialState,
	eraser: eraserInitialState,
	colorPicker: colorPickerInitialState,
	select: selectInitialState,
	copy: copyInitialState,
	cut: cutInitialState,
	paste: pasteInitialState,
	fill: fillInitialState,
};
