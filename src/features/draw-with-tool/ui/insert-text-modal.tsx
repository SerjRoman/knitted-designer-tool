import { useState } from "react";
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
		await dispatch(drawText(text));
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
