import { useState } from "react";
import { addColor } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { HEXToRGB, RGBAToHEX } from "@/shared/lib";
import { useAppDispatch } from "@/shared/store";
import { Modal } from "@/shared/ui";

export function AddColorModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const [color, setColor] = useState("");
	const dispatch = useAppDispatch();
	if (!isOpen) return;
	const handleSaveColor = () => {
		if (!color) return;
		dispatch(addColor(color));
		dispatch(setCurrentColor(color));
		dispatch(addActionToHistory({ type: "ADD_COLOR", payload: { color } }));
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};
	const hexColor = RGBAToHEX(color);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="fixed inset-0 flex items-center justify-center">
				<div className="bg-white p-4 rounded shadow-lg w-72">
					<h3 className="font-medium text-gray-900 mb-3">
						Add a new color
					</h3>
					<div
						className="w-full h-12 rounded border border-gray-300 mb-3"
						style={{ backgroundColor: color }}
					/>

					<div className="flex items-center gap-2 mb-4">
						<span className="text-sm text-gray-700">Pick:</span>
						<input
							type="color"
							value={hexColor}
							onChange={(e) => {
								const newHexColor = e.target.value;
								setColor(HEXToRGB(newHexColor));
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
