import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib";
import type { ToolHandler, ToolHandlers } from "../lib";
import { fillArea } from "../model";

export function useFillTool(): ToolHandlers {
	const dispatch = useAppDispatch();
	const onMouseUp: ToolHandler = useCallback(
		({ point }) => {
			dispatch(fillArea(point));
		},
		[dispatch]
	);

	return {
		onMouseUp,
	};
}
