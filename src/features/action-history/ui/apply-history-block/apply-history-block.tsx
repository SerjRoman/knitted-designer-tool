import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { applyRedo, applyUndo } from "../../model";

export function ApplyHistoryBlock() {
	const dispatch = useAppDispatch();
	const { redoActions, currentActionId } = useAppSelector(
		(state) => state.editor.history
	);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.metaKey) return;
			if (e.key.toLowerCase() === "z") {
				if (e.shiftKey) {
					dispatch(applyRedo());
				} else {
					dispatch(applyUndo());
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch]);
	return (
		<div>
			<button
				disabled={redoActions.length === 0}
				onClick={() => {
					dispatch(applyRedo());
				}}
			>
				Redo
			</button>
			<button
				disabled={!currentActionId}
				onClick={() => {
					dispatch(applyUndo());
				}}
			>
				Undo
			</button>
		</div>
	);
}
