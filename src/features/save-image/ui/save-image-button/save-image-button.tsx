import { Download } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useModal } from "@/shared/lib";
import { StatusModal } from "@/shared/ui";
import { convertGridToColorsArray, convertColorsArrayToUrl } from "../../lib";
import { saveImageToCloud } from "../../model";
import { ToolButton } from "@/entities/editor";

export function SaveImageButton() {
	const { grid, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
	const { error, status, filename } = useAppSelector(
		(state) => state["features/saveImage"]
	);
	const [{ open: openStatusModal }, ModalStatusProvider] = useModal<{
		error: string | null;
		status: typeof status;
	}>();
	const dispatch = useAppDispatch();
	function downloadImage(url: string) {
		const link = document.createElement("a");
		link.href = url;
		link.download = `${filename ? filename : Date.now()}.png`;
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	async function handleClick() {
		const width = numberColumns;
		const height = numberRows;
		const colorsArray = convertGridToColorsArray(grid);
		const url = convertColorsArrayToUrl(colorsArray, width, height);
		await dispatch(saveImageToCloud());

		downloadImage(url);
	}
	useEffect(() => {
		if (status === "failed") {
			openStatusModal({ error, status });
		} else if (status === "succeeded") {
			openStatusModal({ error, status });
		}
	}, [error, openStatusModal, status]);
	return (
		<div className="flex justify-center col-span-2">
			<ToolButton
				icon={Download}
				iconProps={{ size: 24 }}
				label={"Save"}
				onClick={handleClick}
				className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex-1 "
			></ToolButton>

			<ModalStatusProvider
				ModalComponent={({ isOpen, onClose }) => {
					if (status === "loading" || status === "idle") return;
					return (
						<StatusModal
							isOpen={isOpen}
							onClose={onClose}
							variant={
								status === "succeeded" ? "success" : "error"
							}
							title={
								status === "succeeded"
									? "Upload Successful"
									: "Upload Failed"
							}
							message={
								status === "succeeded"
									? "Your motif has been successfully uploaded and processed."
									: "An error occurred while uploading the motif. Please try again later."
							}
							details={error}
						/>
					);
				}}
			/>
		</div>
	);
}
