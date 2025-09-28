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

export interface EditorState {
	toolState: EditorToolState;
	currentColor: string;
	selectedPoints: null | Point[];
	clipboard: {
		points: null | PointWithColor[];
		origin: null | Point;
	};
}
