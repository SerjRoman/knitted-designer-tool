import { ActionButtonsBlock } from "@/features/action-buttons-block";
import { ClipboardControl } from "@/features/clipboard-control";
import { SelectTransformTool } from "@/features/grid-transform";
import { HistoryControl } from "@/features/history-control";
import { SelectDrawingTool } from "@/features/select-drawing-tool";

export function ToolPanel() {
	return (
		<div className="space-y-4">
			<SelectDrawingTool />
			<div className="grid grid-cols-2 rows-1 gap-2">
				<HistoryControl />
				<SelectTransformTool />
			</div>

			<ClipboardControl />
			<ActionButtonsBlock />
		</div>
	);
}
