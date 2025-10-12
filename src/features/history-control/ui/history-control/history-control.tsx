import { Redo, Undo } from "lucide-react";
import { ToolButton } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useHistoryShortcuts } from "../../hooks";
import { applyRedo, applyUndo } from "../../model";

export function HistoryControl() {
	const dispatch = useAppDispatch();
	const { redoActions, currentActionId } = useAppSelector(
		(state) => state.editor.history
	);
	useHistoryShortcuts();
	return (
		<div className="grid grid-cols-2 gap-2">
			<ToolButton
				icon={Redo}
				label="Redo"
				onClick={() => {
					dispatch(applyRedo());
				}}
				disabled={redoActions.length === 0}
			/>
			<ToolButton
				icon={Undo}
				label="Undo"
				onClick={() => {
					dispatch(applyUndo());
				}}
				disabled={!currentActionId}
			/>
		</div>
	);
}
