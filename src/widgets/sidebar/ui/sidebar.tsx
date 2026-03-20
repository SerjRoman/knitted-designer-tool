import { Eye, PictureInPicture } from "lucide-react";
import { type ReactNode } from "react";
import { selectActiveModal, toggleModal } from "@/entities/modal";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function Sidebar() {
	const dispatch = useAppDispatch();
	const activeModal = useAppSelector(selectActiveModal);

	return (
		<div className="flex flex-col gap-2 relative pt-6">
			<SidebarButton
				icon={<PictureInPicture size={24} />}
				label={
					activeModal === "reference"
						? "Close Reference"
						: "Reference"
				}
				onClick={() => dispatch(toggleModal("reference"))}
			/>
			<SidebarButton
				icon={<Eye size={24} />}
				label={
					activeModal === "preview"
						? "Close Preview"
						: "Preview Image"
				}
				onClick={() => dispatch(toggleModal("preview"))}
			/>
		</div>
	);
}

interface SidebarButtonProps {
	icon: ReactNode;
	label: string;
	onClick: () => void;
}
function SidebarButton({ icon, label, onClick }: SidebarButtonProps) {
	return (
		<div className="relative w-10 h-10 flex-shrink-0 z-10 hover:z-50">
			<button
				className="group absolute right-0 top-0 h-10 flex flex-row-reverse items-center bg-gray-100 rounded overflow-hidden transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:bg-gray-200 text-black max-w-[40px] hover:max-w-[200px] px-2 cursor-pointer"
				onClick={onClick}
				title={label}
			>
				<div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
					{icon}
				</div>
				<span className="mr-2 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
					{label}
				</span>
			</button>
		</div>
	);
}
