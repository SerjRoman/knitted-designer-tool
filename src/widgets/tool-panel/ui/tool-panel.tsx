import { Download, Upload } from "lucide-react";
import { ClipboardControl } from "@/features/clipboard-control";
import { SelectDrawingTool } from "@/features/draw-with-tool";
import { SelectTransformTool } from "@/features/grid-transform";
import { HistoryControl } from "@/features/history-control";
import { SaveImageModal } from "@/features/save-image";
import { UploadFromUserModal } from "@/features/upload-image";
import { ToolButton } from "@/entities/editor";
import { closeAllModals } from "@/entities/modal";
import { useModal } from "@/shared/lib";
import { useAppDispatch } from "@/shared/store";

export function ToolPanel() {
	const [
		{ open: openUpload, isOpen: isOpenUpload, close: closeUpload },
		UploadModalWrapper,
	] = useModal();
	const [
		{ open: openSaveModal, isOpen: isOpenSave, close: closeSave },
		SaveModalWrapper,
	] = useModal();
	const dispatch = useAppDispatch();
	function openModal(modalName: "upload" | "save") {
		dispatch(closeAllModals());
		if (modalName === "upload") {
			openUpload();
		} else {
			openSaveModal();
		}
	}
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
						label={"Upload Image"}
						onClick={
							isOpenUpload
								? closeUpload
								: () => openModal("upload")
						}
					/>
					<ToolButton
						icon={Download}
						iconProps={{ size: 24 }}
						label={"Save"}
						onClick={
							isOpenSave ? closeSave : () => openModal("save")
						}
					/>
				</div>
			</div>

			<UploadModalWrapper ModalComponent={UploadFromUserModal} />
			<SaveModalWrapper ModalComponent={SaveImageModal} />
		</div>
	);
}
