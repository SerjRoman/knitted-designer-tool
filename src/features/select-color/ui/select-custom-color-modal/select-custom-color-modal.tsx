import { useState } from "react";
import { HEXToRGB, RGBAToHEX, useAppDispatch } from "@/shared/lib";
import { Modal } from "@/shared/ui";
import { changeColorToCustom } from "../../model";
import type { SelectCustomColorModalProps } from "./select-custom-color-modal.types";

export function SelectCustomColorModal({
	isOpen,
	onClose,
	selectedColor,
}: SelectCustomColorModalProps) {
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
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white p-4 rounded shadow-lg w-72">
					<h3 className="font-medium text-gray-900 mb-3">
						Edit color
					</h3>
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
					<div className="flex gap-2 justify-end">
						<button
							onClick={handleCancel}
							className="px-3 py-1 text-gray-700 border border-gray-300 rounded text-sm hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							onClick={handleSaveColor}
							className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
