import type { Point } from "@/shared/lib";

export type EditorTools =
	| "brush"
	| "line"
	| "rect"
	| "eraser"
	| "colorPicker"
	| "select";
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
	selectedPoints: null | Point[];
	startPoint: null | Point;
}

export type EditorToolState =
	| BrushState
	| LineState
	| RectState
	| EraserState
	| ColorPickerState
	| SelectState;

export interface EditorState {
	toolState: EditorToolState;
	currentColor: string;
}
