import type { EditorTools } from "../../model";
export const isPreviewTool = (tool: EditorTools) =>
	tool === "line" || tool === "rect" || tool === "select";
