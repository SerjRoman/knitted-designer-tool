import { Eye, UploadIcon } from "lucide-react";
import { ToolButton } from "@/entities/editor";
import { selectActiveModal, toggleModal } from "@/entities/ui";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function Sidebar() {
	const activeModal = useAppSelector(selectActiveModal);
	const dispatch = useAppDispatch();

	return (
		<div className="h-full flex flex-col p-6 space-y-6 bg-white">
			<div className="flex items-center justify-between pb-2 border-b border-gray-100">
				<h2 className="text-xl font-bold text-gray-800">Sidebar</h2>
			</div>

			<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm"></div>

			<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm flex-1">
				<div className="grid grid-cols-2 gap-2">
					<ToolButton
						icon={UploadIcon}
						iconProps={{ size: 24 }}
						label={
							activeModal === "upload"
								? "Close reference"
								: "Reference"
						}
						onClick={() => {
							dispatch(toggleModal("upload"));
						}}
					/>
					<ToolButton
						icon={Eye}
						iconProps={{ size: 24 }}
						label={
							activeModal === "preview"
								? "Close preview"
								: "Preview"
						}
						onClick={() => {
							dispatch(toggleModal("preview"));
						}}
						isSelected={false}
					/>
				</div>
			</div>
		</div>
	);
}
