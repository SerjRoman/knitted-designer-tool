import { useEffect, useRef } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { RulersLayer } from "@/widgets/rulers-layer";
import { ToolPanel } from "@/widgets/tool-panel";
import { UILayer } from "@/widgets/ui-layer/ui-layer";
import { ChangeGridSizes } from "@/features/change-grid-sizes";
import { usePanCanvas } from "@/features/pan-canvas";
import { setFilename } from "@/features/save-image";
import { SelectColor } from "@/features/select-color";
import { uploadImageFromCloud } from "@/features/upload-image";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Loader } from "@/shared/ui";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { status } = useAppSelector((state) => state["features/uploadImage"]);
	const dispatch = useAppDispatch();

	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);

	useEffect(() => {
		const filename =
			"APP_CHOICE" in window && typeof window.APP_CHOICE === "string"
				? window.APP_CHOICE
				: localStorage.getItem("APP_CHOICE")
				? localStorage.getItem("APP_CHOICE")
				: null;
		if (filename) {
			dispatch(uploadImageFromCloud(`${filename}`));
			dispatch(setFilename(filename));
		} else {
			console.log("No initial motif provided: ", filename);
		}
	}, [dispatch]);

	return (
		<div className="h-screen w-screen flex bg-white overflow-hidden">
			<div className="flex flex-1">
				<div className="flex-1 relative overflow-hidden">
					<div
						ref={containerRef}
						className="absolute inset-0 bg-white"
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
