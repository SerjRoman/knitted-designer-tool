import type { Point, PointWithColor } from "@/shared/lib";

export type ClipboardTools = "cut" | "copy" | "paste" | "select";
export type DrawingTools =
	| "brush"
	| "line"
	| "shape"
	| "eraser"
	| "colorPicker";

export type EditorTools = DrawingTools | ClipboardTools | "fill";

export type Shapes = "rect" | "ellipse";
export interface BrushState {
	tool: "brush";
	strokedPoints: PointWithColor[] | null;
}
export interface LineState {
	tool: "line";
	startPoint: null | Point;
}
export interface ShapeState {
	tool: "shape";
	shape: Shapes | null;
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
	repeat: boolean;
}
export interface FillState {
	tool: "fill";
}

export type EditorToolState =
	| BrushState
	| LineState
	| ShapeState
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
