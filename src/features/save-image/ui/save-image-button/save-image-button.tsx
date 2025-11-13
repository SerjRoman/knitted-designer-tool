import { Download } from "lucide-react";
import { useEffect } from "react";
import { ToolButton } from "@/entities/editor";
import { useAppDispatch, useAppSelector, useModal } from "@/shared/lib";
import { StatusModal } from "@/shared/ui";
import { saveImageToCloud } from "../../model";

export function SaveImageButton() {
	const { error, status } = useAppSelector(
		(state) => state["features/saveImage"]
	);
	const [{ open: openStatusModal }, ModalStatusProvider] = useModal<{
		error: string | null;
		status: typeof status;
	}>();
	const dispatch = useAppDispatch();
	async function handleClick() {
		await dispatch(saveImageToCloud());
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
									? "Motif Saved Successfully"
									: "Motif Save Failed"
							}
							message={
								status === "succeeded"
									? "Your motif has been successfully saved."
									: "An error occurred while saving the motif. Please try again later."
							}
							details={error}
						/>
					);
				}}
			/>
		</div>
	);
}
