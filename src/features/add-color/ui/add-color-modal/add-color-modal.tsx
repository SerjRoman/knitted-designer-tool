import { useState } from "react";
import { addColor } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { HEXToRGB, RGBAToHEX } from "@/shared/lib";
import { useAppDispatch } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="flex items-center justify-center"
		>
			<div className="flex flex-col bg-white p-4 rounded shadow-lg w-72 gap-2">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Add a new color
					</h2>
				</div>
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
