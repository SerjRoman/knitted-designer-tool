import { Eye } from "lucide-react";
import { ClipboardControl } from "@/features/clipboard-control";
import { SelectTransformTool } from "@/features/grid-transform";
import { HistoryControl } from "@/features/history-control";
import { PreviewImageModal } from "@/features/preview-image";
import { SaveImageButton } from "@/features/save-image";
import { SelectDrawingTool } from "@/features/select-drawing-tool";
import { UploadImageButton } from "@/features/upload-image";
import { ToolButton } from "@/entities/editor";
import { useModal } from "@/shared/lib";

export function ToolPanel() {
	const [{ open,isOpen, close }, ModalWrapper] = useModal();
	return (
		<div className="space-y-4">
			<SelectDrawingTool />
			<div className="grid grid-cols-2 rows-1 gap-2">
				<HistoryControl />
				<SelectTransformTool />
			</div>

			<ClipboardControl />
			<div>
				<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
					Actions
				</h3>
				<div className="grid grid-cols-2 gap-2">
					<ToolButton
						icon={Eye}
						iconProps={{ size: 24 }}
						label={isOpen ? "Close preview" : "Preview"}
						onClick={isOpen ? close : open}
					/>

					<UploadImageButton />
					<SaveImageButton />
				</div>
			</div>
			<ModalWrapper ModalComponent={PreviewImageModal} />
		</div>
	);
}
