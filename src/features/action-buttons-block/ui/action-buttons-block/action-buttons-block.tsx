import { Eye } from "lucide-react";
import { SaveImageButton } from "@/features/save-image";
import { UploadImageButton } from "@/features/upload-image";
import { ToolButton } from "@/entities/editor";

export function ActionButtonsBlock() {
	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
				Actions
			</h3>
			<div className="grid grid-cols-2 gap-2">
				<ToolButton
					icon={Eye}
					iconProps={{ size: 24 }}
					label={"Preview"}
					onClick={function (): void {
						throw new Error("Function not implemented.");
					}}
				/>

				<UploadImageButton />
				<SaveImageButton />
			</div>
		</div>
	);
}
