import { useEffect } from "react";
import {
	clearClipboard,
	clearSelectedPoints,
	selectTool,
} from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
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
			if (document.querySelector('[data-modal-open="true"]')) return;
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

		globalThis.addEventListener("keydown", handleKeyDown);
		return () => globalThis.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, clipboard, selectedPoints, tool]);
}
