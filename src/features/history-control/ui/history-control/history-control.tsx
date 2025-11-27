import { Redo, Undo } from "lucide-react";
import { ToolButton } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useHistoryShortcuts } from "../../hooks";
import { applyRedo, applyUndo } from "../../model";

export function HistoryControl() {
	const dispatch = useAppDispatch();
	const { redoActions, currentActionId } = useAppSelector(
		(state) => state.history
	);
	useHistoryShortcuts();
	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				History
			</h3>
			<div
				className="grid grid-cols-2 grid-rows-1 gap-2 
"
			>
				<ToolButton
					icon={Undo}
					label="Undo"
					onClick={() => {
						dispatch(applyUndo());
					}}
					disabled={!currentActionId}
				/>
				<ToolButton
					icon={Redo}
					label="Redo"
					onClick={() => {
						dispatch(applyRedo());
					}}
					disabled={redoActions.length === 0}
				/>
			</div>
		</div>
	);
}
