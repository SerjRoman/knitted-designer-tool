import { Crop } from "lucide-react";
import { useModal } from "@/shared/lib";
import { ChangeGridSizesModal } from "../change-grid-sizes-modal";

export function ChangeGridSizes() {
	const [{ open }, ModalProvider] = useModal();
	return (
		<div className="flex flex-col gap-2">
			<button
				onClick={() => open()}
				className="flex flex-row items-center justify-center p-2 rounded-lg border-2 transition-all duration-200"
			>
				Change grid size <Crop />
			</button>
			<ModalProvider ModalComponent={ChangeGridSizesModal} />
		</div>
	);
}
