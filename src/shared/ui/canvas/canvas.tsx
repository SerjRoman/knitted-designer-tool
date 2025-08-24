import { useEffect, useRef } from "react";
import type { CanvasProps } from "./canvas.types";

export function Canvas(props: CanvasProps) {
	const { draw, ...rest } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}
		draw(context);
	}, [draw]);

	return <canvas ref={canvasRef} {...rest} />;
}
