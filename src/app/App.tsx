import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { selectCanvasDimensions, setCanvasDimensions } from "@/entities/canvas";
import { GlobalStatusDialog, selectActiveModal } from "@/entities/ui";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { Loader } from "@/shared/ui";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	const { status } = useAppSelector((state) => state["features/uploadImage"]);
	const activeModal = useAppSelector(selectActiveModal);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);
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
		}
	}, [dispatch]);
	useLayoutEffect(() => {
		if (!viewportRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				dispatch(setCanvasDimensions({ width, height }));
			}
		});
		resizeObserver.observe(viewportRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	return (
		<div className="h-screen w-screen flex bg-white overflow-hidden">
			<div
				ref={viewportRef}
				className="flex-1 min-w-0 relative overflow-hidden"
			>
				<div
					ref={containerRef}
					className="relative bg-white flex-1"
					style={{
						width: canvasDimensions.width,
						height: canvasDimensions.height,
					}}
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

			<div className="flex h-screen shrink-0 z-20 bg-white border-l border-gray-200">
				<div className="flex flex-col border-r border-gray-200">
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="p-1.5 -ml-[1px] bg-white border-y border-r border-gray-200 rounded-r-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
						title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
					>
						{isSidebarOpen ? (
							<ChevronLeft size={20} />
						) : (
							<ChevronRight size={20} />
						)}
					</button>
				</div>

				{isSidebarOpen && (
					<div className="w-64 h-screen overflow-y-auto bg-white border-r border-gray-200 shrink-0">
						<Sidebar />
					</div>
				)}

				<div className="w-96 h-screen overflow-y-auto p-6 bg-white space-y-6 shrink-0">
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

			{/* Модалки */}
			{activeModal === "upload" && <ReferenceImageRnd />}
			{activeModal === "preview" && <PreviewImageRnd />}
			<GlobalStatusDialog />
		</div>
	);
}
