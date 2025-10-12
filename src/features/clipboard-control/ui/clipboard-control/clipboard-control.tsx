import { Copy, Scissors, Clipboard } from "lucide-react";
import {
	copySelection,
	cutSelection,
	useClipboardShortucts,
} from "@/features/clipboard-control";
import { selectTool, ToolButton } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function ClipboardControl() {
	const dispatch = useAppDispatch();
	const { clipboard, selectedPoints } = useAppSelector(
		(state) => state.editor
	);
	useClipboardShortucts();
	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				Clipboard
			</h3>
			<div className="grid grid-cols-4 gap-2">
				<ToolButton
					toolName="copy"
					icon={Copy}
					label="Copy"
					onClick={async () => {
						dispatch(selectTool("copy"));
						await dispatch(copySelection());
						dispatch(selectTool("paste"));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
				<ToolButton
					toolName="cut"
					icon={Scissors}
					label="Cut"
					onClick={async () => {
						dispatch(selectTool("cut"));
						await dispatch(cutSelection());
						dispatch(selectTool("paste"));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
				<ToolButton
					toolName="paste"
					icon={Clipboard}
					label="Paste"
					onClick={() => dispatch(selectTool("paste"))}
					disabled={!clipboard.points}
				/>
			</div>
		</div>
	);
}
