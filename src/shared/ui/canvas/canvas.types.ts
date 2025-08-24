import type { CanvasHTMLAttributes, DetailedHTMLProps } from "react";

export interface CanvasProps
	extends DetailedHTMLProps<
		CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	> {
	draw: (context: CanvasRenderingContext2D) => void;
}
