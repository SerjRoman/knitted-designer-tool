import { useRef } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { HorizontalRulerLayer } from "@/widgets/horizontal-ruler-layer";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { VerticalRulerLayer } from "@/widgets/vertical-ruler-layer";
import { ApplyHistoryBlock } from "@/features/action-history";
import {
	ChangeNumberColumns,
	ChangeNumberRows,
	ChangePixelSize,
} from "@/features/change-grid-sizes";
import { usePanCanvas } from "@/features/pan-canvas";
import { SelectColor } from "@/features/select-color";
import { SelectToolPanel } from "@/features/select-tool";
import { useCanvasZoom } from "@/features/zoom-canvas";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);

	return (
		<div>
			<SelectColor />
			<SelectToolPanel />
			<ChangeNumberColumns />
			<ChangeNumberRows />
			<ChangePixelSize />
			<ApplyHistoryBlock />
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
				<UILayer />
			</div>
		</div>
	);
}
