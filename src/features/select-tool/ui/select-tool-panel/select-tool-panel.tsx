import { selectTool } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import styles from "./select-tool-panel.module.css";
export function SelectToolPanel() {
	const dispatch = useAppDispatch();
	const { tool } = useAppSelector((state) => state.editor);
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
		</div>
	);
}
