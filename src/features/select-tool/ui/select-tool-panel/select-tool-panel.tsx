import { useEffect } from "react";
import { copySelection, cutSelection } from "@/features/clipboard";
import { clearClipboard, selectTool } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import styles from "./select-tool-panel.module.css";
export function SelectToolPanel() {
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
						}
						break;
					case "x":
						if (selectedPoints && selectedPoints.length > 0) {
							e.preventDefault();
							dispatch(cutSelection());
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
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, clipboard, selectedPoints, tool]);
	return (
		<div>
			<button
				onClick={() => dispatch(selectTool("brush"))}
				className={tool === "brush" ? styles.active : undefined}
			>
				Brush
			</button>
			<button
				className={tool === "eraser" ? styles.active : undefined}
				onClick={() => dispatch(selectTool("eraser"))}
			>
				Eraser
			</button>
			<button
				className={tool === "colorPicker" ? styles.active : undefined}
				onClick={() => dispatch(selectTool("colorPicker"))}
			>
				Picker
			</button>
			<button
				className={tool === "line" ? styles.active : undefined}
				onClick={() => dispatch(selectTool("line"))}
			>
				Line
			</button>
			<button
				className={tool === "rect" ? styles.active : undefined}
				onClick={() => dispatch(selectTool("rect"))}
			>
				Rect
			</button>
			<button
				className={tool === "select" ? styles.active : undefined}
				onClick={() => {
					dispatch(selectTool("select"));
					dispatch(clearClipboard());
				}}
			>
				Select
			</button>
			<button
				className={tool === "copy" ? styles.active : undefined}
				onClick={async () => {
					dispatch(selectTool("copy"));
					await dispatch(copySelection());
					dispatch(selectTool("paste"));
				}}
			>
				Copy
			</button>
			<button
				className={tool === "cut" ? styles.active : undefined}
				onClick={async () => {
					dispatch(selectTool("cut"));
					await dispatch(cutSelection());
					dispatch(selectTool("paste"));
				}}
			>
				Cut
			</button>
			<button
				className={tool === "paste" ? styles.active : undefined}
				onClick={() => dispatch(selectTool("paste"))}
				disabled={clipboard.points ? false : true}
			>
				Paste
			</button>
		</div>
	);
}
