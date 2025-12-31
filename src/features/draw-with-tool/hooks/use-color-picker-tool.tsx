import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import type { ToolHandler, ToolHandlers } from "../lib";
import { pickColor } from "../model";

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
