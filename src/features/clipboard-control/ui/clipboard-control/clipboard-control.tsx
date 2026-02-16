import { Copy, Scissors, Clipboard, MousePointer, X } from "lucide-react";
import {
	copySelection,
	cutSelection,
	useClipboardShortucts,
} from "@/features/clipboard-control";
import {
	clearClipboard,
	clearSelectedPoints,
	setTool,
	setPasteRepeat,
	ToolButton,
} from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function ClipboardControl() {
	const dispatch = useAppDispatch();
	const {
		clipboard,
		selectedPoints,
		toolState: { tool },
	} = useAppSelector((state) => state.editor);
	useClipboardShortucts();
	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				Clipboard
			</h3>
			<div className="grid grid-cols-4 gap-2">
				{tool === "select" &&
				selectedPoints &&
				selectedPoints?.length > 0 ? (
					<ToolButton
						icon={X}
						label="Deselect"
						onClick={() => {
							dispatch(clearClipboard());
							dispatch(clearSelectedPoints());
						}}
					/>
				) : (
					<ToolButton
						toolName="select"
						icon={MousePointer}
						label="Select"
						onClick={() => {
							dispatch(setTool("select"));
							dispatch(clearClipboard());
						}}
					/>
				)}
				<ToolButton
					toolName="copy"
					icon={Copy}
					label="Copy"
					onClick={async () => {
						dispatch(setTool("copy"));
						await dispatch(copySelection());
						dispatch(setTool("paste"));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
				<ToolButton
					toolName="cut"
					icon={Scissors}
					label="Cut"
					onClick={async () => {
						dispatch(setTool("cut"));
						await dispatch(cutSelection());
						dispatch(setTool("paste"));
						dispatch(setPasteRepeat(false));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
				<ToolButton
					toolName="paste"
					icon={Clipboard}
					label="Paste"
					onClick={() => dispatch(setTool("paste"))}
					disabled={!clipboard.points}
				/>
			</div>
		</div>
	);
}
