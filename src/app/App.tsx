import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CanvasLayer } from "@/widgets/canvas-layer";
import { GridLayer } from "@/widgets/grid-layer";
import { GridSettings } from "@/widgets/grid-settings";
import { RulersLayer } from "@/widgets/rulers-layer";
import { SelectColor } from "@/widgets/select-color";
import { Sidebar } from "@/widgets/sidebar";
import { ToolPanel } from "@/widgets/tool-panel";
import { UILayer } from "@/widgets/ui-layer";
import { usePanCanvas } from "@/features/pan-canvas";
import { PreviewImageRnd } from "@/features/preview-image";
import { setFilename } from "@/features/save-image";
import {
	ReferenceImageRnd,
	uploadImageFromCloud,
} from "@/features/upload-image";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/entities/canvas";
import { GlobalStatusDialog, selectActiveModal } from "@/entities/ui";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { Loader } from "@/shared/ui";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const { status } = useAppSelector((state) => state["features/uploadImage"]);
	const activeModal = useAppSelector(selectActiveModal);
	const dispatch = useAppDispatch();

	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);
	useEffect(() => {
		const params = new URLSearchParams(globalThis.location.search);
		const queryChoice = params.get("choice");

		const filename = queryChoice || null;
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

				<div className="flex h-screen">
					<div className="flex flex-col">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className="z-10 -mr-[1px] p-2 bg-white border border-gray-200 border-r-0 rounded-l-md shadow-sm hover:bg-gray-50 transition-colors"
							title={
								isSidebarOpen ? "Close Sidebar" : "Open Sidebar"
							}
						>
							{isSidebarOpen ? (
								<ChevronRight size={20} />
							) : (
								<ChevronLeft size={20} />
							)}
						</button>
					</div>

					{isSidebarOpen && (
						<div className="w-64 h-screen border-l border-gray-200 bg-white overflow-y-auto">
							<Sidebar />
						</div>
					)}

					<div className="h-screen overflow-y-auto p-6 bg-white border-l border-gray-200 shadow-lg space-y-6">
						<GridSettings />
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
			{activeModal === "upload" && <ReferenceImageRnd />}
			{activeModal === "preview" && <PreviewImageRnd />}
			<GlobalStatusDialog />
		</div>
	);
}
