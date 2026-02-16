import { useState } from "react";
import { HEXToRGB, RGBAToHEX } from "@/shared/lib";
import { useAppDispatch } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { changeColorToCustom } from "../../model";
import type { EditCustomColorModalProps } from "./edit-custom-color-modal.types";

export function EditCustomColorModal({
	isOpen,
	onClose,
	selectedColor,
}: Readonly<EditCustomColorModalProps>) {
	const [customColor, setCustomColor] = useState(selectedColor);
	const dispatch = useAppDispatch();
	if (!isOpen) return;
	const handleSaveColor = () => {
		if (!selectedColor) return;
		dispatch(changeColorToCustom(customColor));
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};
	if (!selectedColor) return;

	const hexColor = RGBAToHEX(selectedColor);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="flex items-center justify-center"
		>
			<div className="flex flex-col bg-white p-4 rounded shadow-lg w-72 gap-2">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Edit color
					</h2>
				</div>
				<div
					className="w-full h-12 rounded border border-gray-300 mb-3"
					style={{ backgroundColor: customColor }}
				/>

				<div className="flex items-center gap-2 mb-4">
					<span className="text-sm text-gray-700">Pick:</span>
					<input
						type="color"
						value={hexColor}
						onChange={(e) => {
							const newHexColor = e.target.value;
							setCustomColor(HEXToRGB(newHexColor));
						}}
						className="w-8 h-8 cursor-pointer"
					/>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button
						variant="outlined"
						color="inherit"
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button onClick={handleSaveColor}>Apply</Button>
				</div>
			</div>
		</Modal>
	);
}
