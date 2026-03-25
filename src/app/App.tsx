import { useEffect, useLayoutEffect, useRef } from "react";
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
import {
	ReferenceImageRnd,
	uploadImageFromCloud,
} from "@/features/upload-image";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { selectCanvasDimensions, setCanvasDimensions } from "@/entities/canva";
import { GlobalStatusDialog, selectActiveModal } from "@/entities/modal";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { Loader } from "@/shared/ui";

export function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	const { status } = useAppSelector((state) => state["features/uploadImage"]);
	const activeModal = useAppSelector(selectActiveModal);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);
	const dispatch = useAppDispatch();
	const { product } = useAppSelector((state) => state.product);
	useCanvasZoom(containerRef);
	usePanCanvas(containerRef);

	useEffect(() => {
		const filename = product?.imageId || null;
		if (filename) {
			console.warn("file loaded", filename);
			dispatch(uploadImageFromCloud(`${filename}`));
		}
	}, [dispatch, product]);
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
		<div className="flex bg-white overflow-hidden">
			<div
				ref={viewportRef}
				className="flex-1 min-w-0 relative overflow-hidden border border-gray-200 shadow-sm"
			>
				<div
					ref={containerRef}
					className="relative bg-white flex-1 "
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
			<Sidebar />
			<div className="flex h-screen shrink-0 z-20 ">
				<div className="w-96 h-screen border-l border-gray-200  p-6 bg-white space-y-6 shrink-0">
					<GridSettings />
					<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
						<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
							COLORS
						</h3>
						<SelectColor />
					</div>

					<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
						<ToolPanel />
					</div>
				</div>
			</div>

			{/* Модалки */}
			{activeModal === "reference" && <ReferenceImageRnd />}
			{activeModal === "preview" && <PreviewImageRnd />}
			<GlobalStatusDialog />
		</div>
	);
}
