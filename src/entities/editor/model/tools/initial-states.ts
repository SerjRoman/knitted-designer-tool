import type {
	BrushState,
	LineState,
	RectState,
	ColorPickerState,
	EraserState,
	EditorToolState,
	EditorTools,
	SelectState,
	CopyState,
	PasteState,
	CutState,
} from "../types";

const brushInitialState: BrushState = { tool: "brush" };
const eraserInitialState: EraserState = { tool: "eraser" };
const colorPickerInitialState: ColorPickerState = { tool: "colorPicker" };
const copyInitialState: CopyState = { tool: "copy" };
const cutInitialState: CutState = { tool: "cut" };
const pasteInitialState: PasteState = { tool: "paste" };
const lineInitialState: LineState = { tool: "line", startPoint: null };
const rectInitialState: RectState = { tool: "rect", startPoint: null };
const selectInitialState: SelectState = {
	tool: "select",
	startPoint: null,
};

export const toolInitialStates: Record<EditorTools, EditorToolState> = {
	brush: brushInitialState,
	line: lineInitialState,
	rect: rectInitialState,
	eraser: eraserInitialState,
	colorPicker: colorPickerInitialState,
	select: selectInitialState,
	copy: copyInitialState,
	cut: cutInitialState,
	paste: pasteInitialState,
};
