import type { Point, PointWithColor } from "@/shared/lib";

export type ClipboardTools = "cut" | "copy" | "paste" | "select";
export type DrawingTools = "brush" | "line" | "rect" | "eraser" | "colorPicker";

export type EditorTools = DrawingTools | ClipboardTools | "fill";
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
export interface FillState {
	tool: "fill";
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
	| PasteState
	| FillState;

export interface ClipboardState {
	points: null | PointWithColor[];
	origin: null | Point;
}
export interface EditorState {
	toolState: EditorToolState;
	currentColor: string;
	selectedPoints: null | Point[];
	clipboard: ClipboardState;
}
