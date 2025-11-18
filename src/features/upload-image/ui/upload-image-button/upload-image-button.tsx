import { Upload } from "lucide-react";
import { useEffect } from "react";
import { ToolButton } from "@/entities/editor";
import { useAppSelector, useModal } from "@/shared/lib";
import { StatusModal } from "@/shared/ui";
import { UploadFromCloudModal } from "../upload-from-cloud-modal";
import { UploadFromUserModal } from "../upload-from-user-modal";
import { UploadTypeModal } from "../upload-type-modal";

export function UploadImageButton() {
	const { error, status } = useAppSelector(
		(state) => state["features/uploadImage"]
	);
	const [{ open: openUserUploadModal }, UserUploadModalProvider] = useModal();
	const [{ open: openUploadType }, UploadModalTypeProvider] = useModal<{
		openModal: typeof openModal;
	}>();
	const [{ open: openCloudUploadModal }, CloudUploadModalProvider] =
		useModal();
	const [{ open: openModalError }, ModalErrorProvider] = useModal<{
		error: string | null;
		status: typeof status;
	}>();
	const openModal = (type: "cloud" | "user" | null) => {
		if (type === "cloud") {
			openCloudUploadModal();
		} else if (type === "user") {
			openUserUploadModal();
		}
	};
	useEffect(() => {
		if (status === "failed") {
			openModalError({ error, status });
		}
	}, [error, openModalError, status]);

	return (
		<>
			<ToolButton
				icon={Upload}
				iconProps={{ size: 24 }}
				label={"Upload"}
				onClick={() => openUploadType({ openModal })}
			/>
			<UserUploadModalProvider ModalComponent={UploadFromUserModal} />
			<CloudUploadModalProvider ModalComponent={UploadFromCloudModal} />
			<UploadModalTypeProvider ModalComponent={UploadTypeModal} />
			<ModalErrorProvider
				ModalComponent={({ isOpen, onClose }) => {
					if (status === "loading" || status === "idle") return;
					return (
						<StatusModal
							isOpen={isOpen}
							onClose={onClose}
							variant={
								status === "succeeded" ? "success" : "error"
							}
							title={
								status === "succeeded"
									? "Upload Successful"
									: "Upload Failed"
							}
							message={
								status === "succeeded"
									? "Your motif has been successfully uploaded and processed."
									: "An error occurred while uploading the motif. Please try again later."
							}
							details={error}
						/>
					);
				}}
			/>
		</>
	);
}
