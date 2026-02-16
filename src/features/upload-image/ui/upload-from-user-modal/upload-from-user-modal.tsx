import { useState, type ChangeEvent } from "react";
import { openDialog } from "@/entities/ui";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { processAndUploadImage } from "../../model";

export function UploadFromUserModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
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
		let value = Number(event.target.value);
		const max = numberOfColumns;
		const min = 1;

		if (value > max) value = max;
		if (value < min) value = min;

		setWidth(value);
	}
	function handleHeightChange(event: ChangeEvent<HTMLInputElement>) {
		let value = Number(event.target.value);
		const max = numberOfRows;
		const min = 1;

		if (value > max) value = max;
		if (value < min) value = min;

		setHeight(value);
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose} doCloseOnClickOutside>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className=" bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
					<h2 className="text-xl font-bold text-gray-800">
						Select sizes of an image
					</h2>

					<div className="space-y-4">
						<div>
							<label
								htmlFor="width-input"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Width
							</label>
							<input
								id="width-input"
								type="number"
								min={1}
								max={numberOfColumns}
								value={width}
								onChange={handleWidthChange}
								className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="height-input"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Height
							</label>
							<input
								id="height-input"
								type="number"
								min={1}
								max={numberOfRows}
								value={height}
								onChange={handleHeightChange}
								className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Cancel
							</button>
							<label className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Upload{" "}
								<input
									type="file"
									className="hidden"
									accept="image/png, image/jpeg"
									onChange={handleFileUpload}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
