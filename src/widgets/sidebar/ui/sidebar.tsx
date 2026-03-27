import { Eye, Move, PictureInPicture, ZoomIn, ZoomOut } from "lucide-react";
import { selectToolState, setTool, ToolButton } from "@/entities/editor";
import { selectActiveModal, toggleModal } from "@/entities/modal";
import { selectZoomScale, setZoomScale } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function Sidebar() {
	const { tool } = useAppSelector(selectToolState);
	const zoomScale = useAppSelector(selectZoomScale);
	const dispatch = useAppDispatch();
	const activeModal = useAppSelector(selectActiveModal);

	return (
		<div className="flex flex-col gap-2 relative pt-6">
			<ToolButton.Icon
				icon={PictureInPicture}
				label={
					activeModal === "reference"
						? "Close Reference"
						: "Reference"
				}
				onClick={() => dispatch(toggleModal("reference"))}
				isSelected={activeModal === "reference"}
			/>
			<ToolButton.Icon
				icon={Eye}
				label={
					activeModal === "preview"
						? "Close Preview"
						: "Preview Image"
				}
				onClick={() => dispatch(toggleModal("preview"))}
				isSelected={activeModal === "preview"}
			/>
			<ToolButton.Icon
				icon={ZoomIn}
				label={"Zoom In"}
				onClick={() => dispatch(setZoomScale(zoomScale * 1.2))}
				isSelected={activeModal === "preview"}
			/>
			<ToolButton.Icon
				icon={ZoomOut}
				label={"Zoom Out"}
				onClick={() => dispatch(setZoomScale(zoomScale / 1.2))}
				isSelected={activeModal === "preview"}
			/>
			<ToolButton.Icon
				icon={Move}
				label={"Move"}
				onClick={() => dispatch(setTool("move"))}
				isSelected={tool === "move"}
			/>
		</div>
	);
}
