import {
	Eye,
	Focus,
	Move,
	PictureInPicture,
	Ruler,
	ZoomIn,
	ZoomOut,
} from "lucide-react";
import { selectToolState, setTool, ToolButton } from "@/entities/editor";
import { selectActiveModal, toggleModal } from "@/entities/modal";
import {
	selectShowCrosshair,
	selectShowRulers,
	toggleCrosshair,
	toggleRulers,
} from "@/entities/settings";
import { selectZoomScale, setZoomScale } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function Sidebar() {
	const { tool } = useAppSelector(selectToolState);
	const doShowRulers = useAppSelector(selectShowRulers);
	const doShowCrosshair = useAppSelector(selectShowCrosshair);
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
			/>
			<ToolButton.Icon
				icon={ZoomOut}
				label={"Zoom Out"}
				onClick={() => dispatch(setZoomScale(zoomScale / 1.2))}
			/>
			<ToolButton.Icon
				icon={Move}
				label={"Move"}
				onClick={() => dispatch(setTool("move"))}
				isSelected={tool === "move"}
			/>
			<ToolButton.Icon
				icon={Ruler}
				label={doShowRulers ? "Hide Rulers" : "Show Rulers"}
				onClick={() => dispatch(toggleRulers())}
				isSelected={doShowRulers}
			/>
			<ToolButton.Icon
				icon={Focus}
				label={doShowCrosshair ? "Hide Crosshair" : "Show Crosshair"}
				onClick={() => dispatch(toggleCrosshair())}
				isSelected={doShowCrosshair}
			/>
		</div>
	);
}
