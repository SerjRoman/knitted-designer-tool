import { InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { selectToolState, setTool } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
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

			<div className="p-6 space-y-4">
				<InputLabel htmlFor="text-input">
					Enter the text you want to place on the canvas.
				</InputLabel>
				<TextField
					id="text-input"
					value={text}
					label=""
					onChange={(event) => setText(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type something..."
					variant="outlined"
					size="medium"
					fullWidth
					autoFocus
					className="bg-white"
				/>
			</div>

			<div className="flex justify-end gap-3 pt-3">
				<Button
					variant="outlined"
					color="inherit"
					onClick={onCloseModal}
					className="text-gray-600 border-gray-300 hover:bg-gray-100"
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleConfirm}
					disabled={!text.trim()}
					disableElevation
				>
					Insert
				</Button>
			</div>
		</Modal>
	);
}
