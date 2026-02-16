import { useAppDispatch, useAppSelector } from "@/shared/store";
import { StatusModal } from "@/shared/ui";
import { closeDialog, selectDialog } from "../model/ui.slice";

export function GlobalStatusDialog() {
	const dispatch = useAppDispatch();
	const { isOpen, variant, title, message, details } =
		useAppSelector(selectDialog);

	if (!isOpen) return null;

	return (
		<StatusModal
			isOpen={isOpen}
			onClose={() => dispatch(closeDialog())}
			variant={variant}
			title={title}
			message={message}
			details={details || undefined}
		/>
	);
}
