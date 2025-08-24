import { useEffect, useRef } from "react";
import type { CanvasProps } from "./canvas.types";

export function Canvas(props: CanvasProps) {
	const { draw, ref, ...rest } = props;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		draw(context);
	}, [draw]);

	useEffect(() => {
		if (!ref) return;
		if (typeof ref === "function") {
			ref(canvasRef.current);
		} else {
			ref.current = canvasRef.current;
		}
	}, [ref]);

	return <canvas ref={canvasRef} {...rest} />;
}
