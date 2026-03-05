import {
	Brush,
	Minus,
	Square,
	Eraser,
	Pipette,
	MousePointer,
	PaintBucket,
} from "lucide-react";
import { ToolButton, clearClipboard, selectTool } from "@/entities/editor";
import { useAppDispatch } from "@/shared/lib";

export function SelectDrawingTool() {
	const dispatch = useAppDispatch();
	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				Drawing Tools
			</h3>
			<div className="grid grid-cols-3 gap-2">
				<ToolButton
					toolName="brush"
					icon={Brush}
					label="Brush"
					onClick={() => dispatch(selectTool("brush"))}
				/>
				<ToolButton
					toolName="line"
					icon={Minus}
					label="Line"
					onClick={() => dispatch(selectTool("line"))}
				/>
				<ToolButton
					toolName="rect"
					icon={Square}
					label="Rectangle"
					onClick={() => dispatch(selectTool("rect"))}
				/>
				<ToolButton
					toolName="eraser"
					icon={Eraser}
					label="Eraser"
					onClick={() => dispatch(selectTool("eraser"))}
				/>
				<ToolButton
					toolName="colorPicker"
					icon={Pipette}
					label="Picker"
					onClick={() => dispatch(selectTool("colorPicker"))}
				/>
				<ToolButton
					toolName="select"
					icon={MousePointer}
					label="Select"
					onClick={() => {
						dispatch(selectTool("select"));
						dispatch(clearClipboard());
					}}
				/>
				<ToolButton
					toolName="fill"
					icon={PaintBucket}
					label="Fill Area"
					onClick={() => {
						dispatch(selectTool("fill"));
					}}
				/>
			</div>
		</div>
	);
}
