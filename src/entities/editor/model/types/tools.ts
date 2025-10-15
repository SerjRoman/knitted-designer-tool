import type { Point, PointWithColor } from "@/shared/lib";

export type EditorTools =
	| "brush"
	| "line"
	| "rect"
	| "eraser"
	| "colorPicker"
	| "select"
	| "copy"
	| "cut"
	| "paste";
export interface BrushState {
	tool: "brush";
	strokedPoints: PointWithColor[] | null;
}
export interface LineState {
	tool: "line";
	startPoint: null | Point;
}
export interface RectState {
	tool: "rect";
	startPoint: null | Point;
}
export interface EraserState {
	tool: "eraser";
	strokedPoints: PointWithColor[] | null;
}
export interface ColorPickerState {
	tool: "colorPicker";
}
export interface SelectState {
	tool: "select";
	startPoint: null | Point;
}
export interface CutState {
	tool: "cut";
}
export interface CopyState {
	tool: "copy";
}
export interface PasteState {
	tool: "paste";
}

export type EditorToolState =
	| BrushState
	| LineState
	| RectState
	| EraserState
	| ColorPickerState
	| SelectState
	| CutState
	| CopyState
	| PasteState;

export interface Action {
	id: string;
	toolUsed: EditorTools;
	pointsAfter: PointWithColor[];
	pointsBefore: PointWithColor[];
}
export interface HistoryState {
	currentActionId: string | null;
	undoActions: Action[];
	redoActions: Action[];
}

export interface ClipboardState {
	points: null | PointWithColor[];
	origin: null | Point;
}
export interface EditorState {
	toolState: EditorToolState;
	currentColor: string;
	selectedPoints: null | Point[];
	clipboard: ClipboardState;
	history: HistoryState;
}
