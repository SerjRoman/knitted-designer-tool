import type {
	BrushState,
	LineState,
	RectState,
	ColorPickerState,
	EraserState,
	EditorToolState,
	EditorTools,
	SelectState,
} from "../types";

const brushInitialState: BrushState = { tool: "brush" };
const eraserInitialState: EraserState = { tool: "eraser" };
const colorPickerInitialState: ColorPickerState = { tool: "colorPicker" };
const lineInitialState: LineState = { tool: "line", startPoint: null };
const rectInitialState: RectState = { tool: "rect", startPoint: null };
const selectInitialState: SelectState = {
	tool: "select",
	startPoint: null,
	selectedPoints: null,
};

export const toolInitialStates: Record<EditorTools, EditorToolState> = {
	brush: brushInitialState,
	line: lineInitialState,
	rect: rectInitialState,
	eraser: eraserInitialState,
	colorPicker: colorPickerInitialState,
    select: selectInitialState
};
