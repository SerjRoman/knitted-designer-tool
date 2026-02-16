import { Upload } from "lucide-react";
import { ClipboardControl } from "@/features/clipboard-control";
import { SelectDrawingTool } from "@/features/draw-with-tool";
import { SelectTransformTool } from "@/features/grid-transform";
import { HistoryControl } from "@/features/history-control";
import { SaveImageButton } from "@/features/save-image";
import { UploadFromUserModal } from "@/features/upload-image";
import { ToolButton } from "@/entities/editor";
import { useModal } from "@/shared/lib";

export function ToolPanel() {
	const [{ open, isOpen, close }, ModalWrapper] = useModal();
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
						icon={Upload}
						iconProps={{ size: 24 }}
						label={isOpen ? "Close upload" : "Upload"}
						onClick={isOpen ? close : open}
					/>
					<SaveImageButton />
				</div>
			</div>

			<ModalWrapper ModalComponent={UploadFromUserModal} />
		</div>
	);
}
