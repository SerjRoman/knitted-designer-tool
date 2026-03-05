import { ClipboardControl } from "@/features/clipboard-control";
import { SelectTransformTool } from "@/features/grid-transform";
import { HistoryControl } from "@/features/history-control";
import { SelectDrawingTool } from "@/features/select-drawing-tool";

export function ToolPanel() {
	return (
		<div className="space-y-4">
			<SelectDrawingTool />
			<HistoryControl />
			<SelectTransformTool />
			<ClipboardControl />
		</div>
	);
}
