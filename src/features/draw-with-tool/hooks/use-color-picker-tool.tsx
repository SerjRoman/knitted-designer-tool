import { useCallback } from "react";
import { pickColor } from "@/features/select-drawing-tool";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { ToolHandler, ToolHandlers } from "../lib";

export function useColorPickerTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
	} = useAppSelector((state) => state.editor);
	const onMouseDown: ToolHandler = useCallback(
		({ point }) => {
			if (tool === "colorPicker") {
				dispatch(pickColor(point));
			}
		},
		[dispatch, tool]
	);

	return { onMouseDown: onMouseDown };
}
