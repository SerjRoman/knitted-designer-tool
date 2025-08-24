import { useCallback, type MouseEvent } from "react";
import { SelectColor } from "@/features/select-color";
import { ButtonEraser } from "@/features/select-eraser";
import { drawPixelGrid, setPixel } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";
export function App() {
	const { grid, pixelSize } = useAppSelector((state) => state.canvas);
	const dispatch = useAppDispatch();
	const draw = useCallback(
		(context: CanvasRenderingContext2D) => {
			drawPixelGrid(context, grid, pixelSize);
		},
		[grid, pixelSize]
	);
	const handleDraw = (event: MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor(offsetX / pixelSize);
		const gridY = Math.floor(offsetY / pixelSize);
		console.log(offsetY, pixelSize);
		if (grid[gridY] && grid[gridY][gridX] !== undefined) {
			console.log("Clicked");
			dispatch(setPixel({ x: gridX, y: gridY }));
		}
	};
	return (
		<div style={{ height: "100vh" }}>
			<SelectColor />
			<ButtonEraser />
			<Canvas
				draw={draw}
				width={800}
				height={800}
				style={{
					cursor: "crosshair",
				}}
				onMouseDown={handleDraw}
			></Canvas>
		</div>
	);
}
