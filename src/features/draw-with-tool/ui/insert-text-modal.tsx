import { useState } from "react";
import type { PixelFontSize } from "@/entities/canva";
import { selectToolState, setTool } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { TextInput } from "@/shared/ui/text-input";
import { drawText } from "../model";

export function InsertTextModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const toolState = useAppSelector(selectToolState);
	const [text, setText] = useState<string>("");
	const [size, setSize] = useState<PixelFontSize>("small");
	const dispatch = useAppDispatch();
	if (!isOpen || toolState.tool !== "insertText") {
		return null;
	}
	function onCloseModal() {
		onClose();
		dispatch(setTool("brush"));
	}
	const handleConfirm = async () => {
		if (!text.trim()) return;
		await dispatch(drawText({ text, size }));
		onClose();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleConfirm();
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			doCloseOnClickOutside={true}
			className="flex flex-col overflow-hidden rounded-xl shadow-2xl bg-white p-4"
		>
			<div className="py-1 border-b border-gray-100 flex items-center gap-3">
				<h2 className="text-lg font-bold text-gray-800">Insert Text</h2>
			</div>

			<div className="p-4 ">
				<TextInput
					value={text}
					label="Enter the text you want to place on the canvas."
					onChange={(event) => setText(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type something..."
					autoFocus
					classNames={{
						root: "gap-4",
					}}
				/>
				<div className="mt-4 flex flex-col gap-2">
					<label
						htmlFor="size-select"
						className="text-sm font-medium text-gray-700"
					>
						Font Size
					</label>
					<select
						id="size-select"
						value={size}
						onChange={(e) =>
							setSize(e.target.value as PixelFontSize)
						}
						className="border border-gray-300 rounded-md shadow-sm outline-none w-full p-2 h-[41px]"
					>
						<option value="small">Small (3x5)</option>
						<option value="medium">Medium (4x6)</option>
						<option value="large">Large (5x7)</option>
					</select>
				</div>
			</div>

			<div className="flex justify-end gap-3 pt-3">
				<Button variant="cancel" onClick={onCloseModal}>
					Cancel
				</Button>
				<Button onClick={handleConfirm} disabled={!text.trim()}>
					Insert
				</Button>
			</div>
		</Modal>
	);
}
