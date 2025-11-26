import { type MouseEvent } from "react";
import { type Point } from "@/shared/lib";

export interface ToolHandlerParams {
	event: MouseEvent<HTMLCanvasElement>;
	point: Point;
}

export interface ToolHandlers {
	onMouseDown?: ToolHandler;
	onMouseMove?: ToolHandler;
	onMouseUp?: ToolHandler;
	onDrawPreview?: PreviewToolHandler;
	onMouseLeave?: ToolHandlerWithoutPoint;
}
export type ToolHandler = (params: ToolHandlerParams) => void;
export type ToolHandlerWithoutPoint = (
	params: Omit<ToolHandlerParams, "point">
) => void;
export type PreviewToolHandler = (
	context: CanvasRenderingContext2D,
	params: Omit<ToolHandlerParams, "event">
) => void;
