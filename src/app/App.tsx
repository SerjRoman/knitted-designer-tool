import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { SelectColor } from "@/features/select-color";
import { ButtonEraser } from "@/features/select-eraser";
import { RULER_SIZE, useAppSelector } from "@/shared/lib";

export function App() {
	const { pixelSize, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);

	return (
		<div>
			<SelectColor />
			<ButtonEraser />
			<div
				style={{
					position: "relative",
					width: `${pixelSize * numberColumns + RULER_SIZE}px`,
					height: `${pixelSize * numberRows + RULER_SIZE}px`,
				}}
			>
				<CanvasLayer />
				<GridLayer />
			</div>
		</div>
	);
}
