import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { applyRedo, applyUndo } from "../../model";

export function ApplyHistoryBlock() {
	const dispatch = useAppDispatch();
	const { undoActions, redoActions } = useAppSelector(
		(state) => state.editor.history
	);
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
				disabled={undoActions.length === 0}
				onClick={() => {
					dispatch(applyUndo());
				}}
			>
				Undo
			</button>
		</div>
	);
}
