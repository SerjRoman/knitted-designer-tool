import { useMemo } from "react";
import { useAppSelector } from "@/shared/store";
import type { ToolHandlers } from "../lib";
import {
	useColorPickerTool,
	useDrawingTool,
	useFillTool,
	useLineTool,
	useSelectTool,
	useShapeTool,
} from "./";

export function useActiveToolHandlers() {
	const toolName = useAppSelector((state) => state.editor.toolState.tool);

	const drawingHandlers = useDrawingTool();
	const colorPickerHandlers = useColorPickerTool();
	const lineHandlers = useLineTool();
	// const pasteHandlers = usePasteTool();
	const fillHandlers = useFillTool();
	const selectHandlers = useSelectTool();
	const shapeHandlers = useShapeTool();

	return useMemo(() => {
		const handlersMap: Record<string, ToolHandlers> = {
			brush: drawingHandlers,
			eraser: drawingHandlers,
			colorPicker: colorPickerHandlers,
			line: lineHandlers,
			// paste: pasteHandlers,
			fill: fillHandlers,
			select: selectHandlers,
			shape: shapeHandlers,
		};

		return handlersMap[toolName] || {};
	}, [
		drawingHandlers,
		colorPickerHandlers,
		lineHandlers,
		fillHandlers,
		selectHandlers,
		shapeHandlers,
		toolName,
	]);
}
