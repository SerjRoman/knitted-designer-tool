import {
	Brush,
	Minus,
	Eraser,
	Pipette,
	PaintBucket,
	Square,
	Circle,
} from "lucide-react";
import { ToolButton, setTool, setShape } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function SelectDrawingTool() {
	const dispatch = useAppDispatch();
	const { toolState } = useAppSelector((state) => state.editor);
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
					onClick={() => dispatch(setTool("brush"))}
				/>
				<ToolButton
					toolName="line"
					icon={Minus}
					label="Line"
					onClick={() => dispatch(setTool("line"))}
				/>
				<ToolButton
					toolName="shape"
					icon={Square}
					label="Rectangle"
					onClick={() => {
						dispatch(setTool("shape"));
						dispatch(setShape("rect"));
					}}
					isSelected={
						toolState.tool === "shape" && toolState.shape === "rect"
					}
				/>
				<ToolButton
					toolName="shape"
					icon={Circle}
					label="Ellipse"
					onClick={() => {
						dispatch(setTool("shape"));
						dispatch(setShape("ellipse"));
					}}
					isSelected={
						toolState.tool === "shape" &&
						toolState.shape === "ellipse"
					}
				/>
				<ToolButton
					toolName="eraser"
					icon={Eraser}
					label="Eraser"
					onClick={() => dispatch(setTool("eraser"))}
				/>
				<ToolButton
					toolName="colorPicker"
					icon={Pipette}
					label="Picker"
					onClick={() => dispatch(setTool("colorPicker"))}
				/>

				<ToolButton
					toolName="fill"
					icon={PaintBucket}
					label="Fill Area"
					onClick={() => {
						dispatch(setTool("fill"));
					}}
				/>
			</div>
		</div>
	);
}
