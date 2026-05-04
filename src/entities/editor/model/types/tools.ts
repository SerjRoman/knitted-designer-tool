import type { Point, PointWithCode } from "@/shared/lib";

export type ClipboardTools = "cut" | "copy" | "paste" | "select";
export type DrawingTools =
	| "brush"
	| "line"
	| "shape"
	| "eraser"
	| "colorPicker";

export type EditorTools =
	| DrawingTools
	| ClipboardTools
	| "fill"
	| "insertText"
	| "move";

export type Shapes = "rect" | "ellipse";
export interface BrushState {
	tool: "brush";
	strokedPoints: PointWithCode[] | null;
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
	strokedPoints: PointWithCode[] | null;
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
export interface MoveState {
	tool: "move";
}
export interface InsertTextState {
	tool: "insertText";
	text: string | null;
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
	| FillState
	| InsertTextState
	| MoveState;

export interface ClipboardState {
	points: null | PointWithCode[];
	origin: null | Point;
}
export interface EditorState {
	toolState: EditorToolState;
	currentColorId: number;
	currentSymbolId: number;
	selectedPoints: null | Point[];
	clipboard: ClipboardState;
}
