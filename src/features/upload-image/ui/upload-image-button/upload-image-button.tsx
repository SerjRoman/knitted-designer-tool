import { Upload } from "lucide-react";
import { useModal } from "@/shared/lib";
import { UploadFromCloudModal } from "../upload-from-cloud-modal";
import { UploadFromUserModal } from "../upload-from-user-modal";
import { UploadTypeModal } from "../upload-type-modal";

export function UploadImageButton() {
	const [{ open: openUserUploadModal }, UserUploadModalProvider] = useModal();
	const [{ open: openUploadType }, UploadModalTypeProvider] = useModal<{
		openModal: typeof openModal;
	}>();
	const [{ open: openCloudUploadModal }, CloudUploadModalProvider] =
		useModal();
	const openModal = (type: "cloud" | "user" | null) => {
		if (type === "cloud") {
			openCloudUploadModal();
		} else if (type === "user") {
			openUserUploadModal();
		}
	};

	return (
		<>
			<label
				className="flex flex-col items-center justify-center gap-3 p-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all cursor-pointer"
				onClick={() => openUploadType({ openModal })}
			>
				<Upload size={24} />
				<span className="font-semibold">Upload</span>
			</label>
			<UserUploadModalProvider ModalComponent={UploadFromUserModal} />
			<CloudUploadModalProvider ModalComponent={UploadFromCloudModal} />
			<UploadModalTypeProvider ModalComponent={UploadTypeModal} />
		</>
	);
}
