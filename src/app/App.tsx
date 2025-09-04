import { useRef } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { usePanCanvas } from "@/features/pan-canvas";
import { SelectColor } from "@/features/select-color";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { SelectToolPanel } from "@/features/select-tool";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);

	return (
		<div>
			<SelectColor />
			<SelectToolPanel />
			<div
				ref={containerRef}
				style={{
					position: "relative",
					width: `${900}px`,
					height: `${900}px`,
				}}
			>
				<CanvasLayer />
				<GridLayer />
				<HorizontalRulerLayer />
				<VerticalRulerLayer />
			</div>
		</div>
	);
}
