import { useEffect, useRef } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { RulersLayer } from "@/widgets/rulers-layer";
import { ToolPanel } from "@/widgets/tool-panel";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { ChangeGridSizes } from "@/features/change-grid-sizes";
import { usePanCanvas } from "@/features/pan-canvas";
import { setFilename } from "@/features/save-image";
import { SelectColor } from "@/widgets/select-color";
import { uploadImageFromCloud } from "@/features/upload-image";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Loader } from "@/shared/ui";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { status } = useAppSelector((state) => state["features/uploadImage"]);
	const dispatch = useAppDispatch();

	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const queryChoice = params.get("choice");

		const filename = queryChoice ? queryChoice : null;
		if (filename) {
			console.warn("file loaded", filename);
			dispatch(uploadImageFromCloud(`${filename}`));
			dispatch(setFilename(filename));
		} else {
			console.warn("No initial motif provided: ", filename);
		}
	}, [dispatch]);

	return (
		<div className="h-screen w-screen flex bg-white overflow-hidden">
			<div className="flex flex-1">
				<div className="flex-1 relative overflow-hidden">
					<div
						ref={containerRef}
						className="relative bg-white"
						style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
					>
						{status === "loading" ? (
							<div className="h-full w-full flex items-center justify-center">
								<Loader size="l" />
							</div>
						) : (
							<>
								<CanvasLayer />
								<GridLayer />
								<RulersLayer />
								<UILayer />
							</>
						)}
					</div>
				</div>

				<div className="w-96 h-screen overflow-y-auto p-6 bg-white border-l border-gray-200 shadow-lg space-y-6">
					<ChangeGridSizes />
					<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
						<h3 className="text-lg font-semibold text-gray-700 mb-3">
							Colors
						</h3>
						<SelectColor />
					</div>

					<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
						<ToolPanel />
					</div>
				</div>
			</div>
		</div>
	);
}
