import { useCallback } from "react";
import { pasteFromClipboard } from "@/features/clipboard-control";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { ToolHandler, ToolHandlers } from "../lib";

export function usePasteTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
	} = useAppSelector((state) => state.editor);

	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (tool === "paste") {
				dispatch(pasteFromClipboard(point));
			}
		},
		[dispatch, tool]
	);
	return { onMouseDown };
}
