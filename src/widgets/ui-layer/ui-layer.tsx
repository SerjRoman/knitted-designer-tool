import { useCallback, useState, type MouseEvent } from "react";
import {
	drawLine,
	drawPixel,
	drawRect,
	drawSelect,
} from "@/features/draw-pixel";
import { pickColor } from "@/features/select-tool";
import {
	drawCrosshair,
	drawPreviewLine,
	drawPreviewRect,
	drawPreviewSelect,
	drawSelectedPoints,
} from "@/entities/canvas";
import {
	addSelectedPoint,
	clearSelectedPoints,
	isPreviewTool,
	removeSelectedPoint,
	setLineStartPoint,
	setRectStartPoint,
	setSelectStartPoint,
} from "@/entities/editor";
import {
	isPointInPoints,
	RULER_SIZE,
	useAppDispatch,
	useAppSelector,
	useDebounce,
	usePointFromEvent,
} from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function UILayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const dispatch = useAppDispatch();
	const { point, updatePointFromEvent } = usePointFromEvent();

	const { pixelSize } = useAppSelector((state) => state.canvas);
	const { scale, offsets, isPanning } = useAppSelector(
		(state) => state.viewport
	);
	const { toolState } = useAppSelector((state) => state.editor);
	const selectedPoints = useDebounce(
		toolState.tool === "select" ? toolState.selectedPoints : null
	);

	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
			const canvas = context.canvas;
			context.imageSmoothingEnabled = false;
			context.resetTransform();

			context.clearRect(0, 0, canvas.width, canvas.height);

			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);
			if ("selectedPoints" in toolState && toolState.selectedPoints) {
				drawSelectedPoints(
					context,
					toolState.selectedPoints,
					pixelSize
				);
			}
			if (!point || isPanning) return;

			if (
				isDrawing &&
				isPreviewTool(toolState.tool) &&
				"startPoint" in toolState &&
				toolState.startPoint
			) {
				if (toolState.tool === "line") {
					drawPreviewLine(
						context,
						toolState.startPoint,
						point,
						pixelSize
					);
				} else if (toolState.tool === "rect") {
					drawPreviewRect(
						context,
						toolState.startPoint,
						point,
						pixelSize
					);
				} else if (toolState.tool === "select") {
					drawPreviewSelect(
						context,
						toolState.startPoint,
						point,
						pixelSize
					);
				}
			} else {
				drawCrosshair(context, point, pixelSize);
			}
		},
		[offsets, scale, point, isPanning, isDrawing, toolState, pixelSize]
	);

	const handleDrawing = () => {
		if (!point) return;
		switch (toolState.tool) {
			case "eraser":
			case "brush":
				dispatch(drawPixel(point));
				break;
			case "colorPicker":
				dispatch(pickColor(point));
				break;
		}
	};

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		if (isPanning || !point) return;
		setIsDrawing(true);

		if (toolState.tool === "line") {
			dispatch(setLineStartPoint(point));
		} else if (toolState.tool === "rect") {
			dispatch(setRectStartPoint(point));
		} else if (toolState.tool === "select") {
			if (event.shiftKey) {
				let isPointInSelected = false;
				if (toolState.selectedPoints) {
					isPointInSelected = isPointInPoints(
						point,
						toolState.selectedPoints
					);
				}

				if (isPointInSelected) {
					dispatch(removeSelectedPoint(point));
				} else {
					dispatch(addSelectedPoint(point));
				}
			} else {
				if (!toolState.startPoint) {
					dispatch(clearSelectedPoints());
					dispatch(setSelectStartPoint(point));
				}
			}
		} else {
			handleDrawing();
		}
	}

	function handleMouseUp() {
		if (!isDrawing) return;

		if (isPreviewTool(toolState.tool) && point) {
			if (toolState.tool === "line") {
				dispatch(drawLine(point));
			} else if (toolState.tool === "rect") {
				dispatch(drawRect(point));
			} else if (toolState.tool === "select") {
				dispatch(drawSelect(point));
			}
		}

		setIsDrawing(false);
	}

	function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
		updatePointFromEvent(event);
		if (isDrawing && point) {
			if (!isPreviewTool(toolState.tool)) {
				handleDrawing();
				return;
			}
			if (toolState.tool === "select" && event.shiftKey) {
				if (!selectedPoints) return;
				const isPointInSelected = isPointInPoints(
					point,
					selectedPoints
				);
				if (isPointInSelected) {
					dispatch(removeSelectedPoint(point));
				} else {
					dispatch(addSelectedPoint(point));
				}
			}
		}
	}

	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 100,
				top: RULER_SIZE,
				left: RULER_SIZE,
			}}
			width={800}
			height={800}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseUp}
		/>
	);
}
