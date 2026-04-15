import { useRef, useState, type ChangeEvent } from "react";
import {
	selectNumberOfRows,
	selectNumberOfColumns,
	setPixelsWithColor,
	selectGrid,
} from "@/entities/canva";
import {
	setClipboardPoints,
	setClipboardOrigin,
	setTool,
} from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { openDialog } from "@/entities/modal";
import { clamp } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { TextInput } from "@/shared/ui/text-input";
import { processAndUploadImage } from "../../model";

export function UploadFromUserModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const gridHeight = useAppSelector(selectNumberOfRows);
	const gridWidth = useAppSelector(selectNumberOfColumns);
	const grid = useAppSelector(selectGrid);
	const handleUploadButtonClick = () => {
		fileInputRef.current?.click();
	};
	const dispatch = useAppDispatch();
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas,
	);
	const [width, setWidth] = useState<number>(numberOfColumns);
	const [height, setHeight] = useState<number>(numberOfRows);
	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		let variant: "error" | "success" | "info" = "success";
		let title = "Upload Successful";
		let message = "Your image has been successfully uploaded.";
		let details: null | string = null;
		await dispatch(
			processAndUploadImage({
				file,
				width,
				height,
			}),
		)
			.unwrap()
			.then(({ points, originPoint }) => {
				if (gridHeight === height && gridWidth === width) {
					const pointsBefore = points.map((p) => ({
						x: p.x,
						y: p.y,
						color: grid[p.y][p.x],
					}));
					dispatch(setPixelsWithColor({ points }));
					dispatch(
						addActionToHistory({
							type: "DRAW",
							payload: {
								pointsAfter: points,
								pointsBefore,
							},
						}),
					);
				} else {
					dispatch(setClipboardPoints(points));
					dispatch(setClipboardOrigin(originPoint));
					dispatch(setTool("paste"));
				}
			})
			.catch((error) => {
				variant = "error";
				title = "Upload Failed";
				message = "An error occurred while uploading the motif.";
				details = error.message;
			});
		dispatch(
			openDialog({
				variant: variant,
				title: title,
				message: message,
				details,
			}),
		);

		onClose();
	};
	function handleWidthChange(event: ChangeEvent<HTMLInputElement>) {
		const value = clamp(Number(event.target.value), 1, numberOfColumns);
		setWidth(value);
	}
	function handleHeightChange(event: ChangeEvent<HTMLInputElement>) {
		const value = clamp(Number(event.target.value), 1, numberOfRows);
		setHeight(value);
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			doCloseOnClickOutside
			className="flex items-center justify-center z-50"
		>
			<div className=" bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Select sizes of an image
					</h2>
				</div>

				<div className="flex space-y-4 flex-col">
					<TextInput
						type="number"
						label="Width"
						value={width}
						onChange={handleWidthChange}
					/>
					<TextInput
						type="number"
						label="Height"
						value={height}
						onChange={handleHeightChange}
					/>
					<div className="flex justify-end gap-3 pt-2">
						<Button onClick={onClose} variant="cancel">
							Cancel
						</Button>
						<Button onClick={handleUploadButtonClick}>
							Upload{" "}
							<input
								ref={fileInputRef}
								type="file"
								className="hidden"
								accept="image/png, image/jpeg"
								onChange={handleFileUpload}
							/>
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
