import { useAppSelector } from "@/shared/store";
import type { ToolHandlers } from "../lib";
import { useEllipseTool } from "./use-ellipse-tool";
import { useRectTool } from "./use-rect-tool";

export function useShapeTool(): ToolHandlers {
	const { toolState } = useAppSelector((state) => state.editor);
	const rectHandlers = useRectTool();
	const ellipseHandlers = useEllipseTool();
	if (toolState.tool === "shape") {
		if (toolState.shape === "rect") return rectHandlers;
		if (toolState.shape === "ellipse") return ellipseHandlers;
	}
	return {};
}
