import { useMemo } from "react";
import { useAppSelector } from "@/shared/lib";
import type { ToolHandlers } from "../lib";
import {
	useColorPickerTool,
	useDrawingTool,
	useFillTool,
	useLineTool,
	usePasteTool,
	useRectTool,
	useSelectTool,
} from "./";

export function useActiveToolHandlers() {
	const toolName = useAppSelector((state) => state.editor.toolState.tool);

	const drawingHandlers = useDrawingTool();
	const colorPickerHandlers = useColorPickerTool();
	const lineHandlers = useLineTool();
	const pasteHandlers = usePasteTool();
	const rectHandlers = useRectTool();
	const fillHandlers = useFillTool();
	const selectHandlers = useSelectTool();
	return useMemo(() => {
		const handlersMap: Record<string, ToolHandlers> = {
			brush: drawingHandlers,
			eraser: drawingHandlers,
			colorPicker: colorPickerHandlers,
			line: lineHandlers,
			paste: pasteHandlers,
			rect: rectHandlers,
			fill: fillHandlers,
			select: selectHandlers,
		};

		return handlersMap[toolName] || {};
	}, [
		toolName,
		drawingHandlers,
		colorPickerHandlers,
		lineHandlers,
		pasteHandlers,
		rectHandlers,
		fillHandlers,
		selectHandlers,
	]);
}
