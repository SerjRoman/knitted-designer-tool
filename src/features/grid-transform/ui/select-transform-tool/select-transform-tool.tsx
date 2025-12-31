import { FlipVertical, FlipHorizontal } from "lucide-react";
import { ToolButton } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { flipSelection } from "../../model/thunks";

export function SelectTransformTool() {
	const dispatch = useAppDispatch();
	const { selectedPoints } = useAppSelector((state) => state.editor);

	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				Transform
			</h3>
			<div className="grid grid-cols-2 rows-1 gap-2">
				<ToolButton
					icon={FlipVertical}
					label="Flip V"
					onClick={() => {
						dispatch(flipSelection("vertical"));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
				<ToolButton
					icon={FlipHorizontal}
					label="Flip H"
					onClick={() => {
						dispatch(flipSelection("horizontal"));
					}}
					disabled={!selectedPoints || selectedPoints.length === 0}
				/>
			</div>
		</div>
	);
}
