import { Upload } from "lucide-react";
import { useModal } from "@/shared/lib";
import { UploadImageModal } from "../upload-image-modal";

export function UploadImageButton() {
	const [{ open }, ModalProvider] = useModal();

	return (
		<>
			<label
				className="flex flex-col items-center justify-center gap-3 p-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all cursor-pointer"
				onClick={() => open()}
			>
				<Upload size={24} />
				<span className="font-semibold">Upload</span>
			</label>
			<ModalProvider ModalComponent={UploadImageModal} />
		</>
	);
}
