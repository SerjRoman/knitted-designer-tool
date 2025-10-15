import { useEffect } from "react";
import {
	clearClipboard,
	clearSelectedPoints,
	selectTool,
} from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { copySelection, cutSelection } from "../model";

export function useClipboardShortucts() {
	const dispatch = useAppDispatch();
	const {
		toolState: { tool },
		clipboard,
		selectedPoints,
	} = useAppSelector((state) => state.editor);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				switch (e.key.toLowerCase()) {
					case "c":
						if (selectedPoints && selectedPoints.length > 0) {
							e.preventDefault();
							dispatch(copySelection());
							dispatch(selectTool("paste"));
						}
						break;
					case "x":
						if (selectedPoints && selectedPoints.length > 0) {
							e.preventDefault();
							dispatch(cutSelection());
							dispatch(selectTool("paste"));
						}
						break;
					case "v":
						if (clipboard) {
							e.preventDefault();
							dispatch(selectTool("paste"));
						}
						break;
				}
			}
			if (e.key === "Escape") {
				if (tool === "paste") {
					dispatch(selectTool("select"));
					dispatch(clearClipboard());
				} else if (tool === "select") {
					dispatch(clearSelectedPoints());
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, clipboard, selectedPoints, tool]);
}
