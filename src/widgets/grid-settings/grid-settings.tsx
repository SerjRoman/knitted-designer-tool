import { useModal } from "@/shared/lib";
import { useAppSelector } from "@/shared/store";
import { GridSettingsModal } from "./grid-settings-modal";

export function GridSettings() {
	const [{ open }, ModalProvider] = useModal();

	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas
	);

	return (
		<>
			<button
				className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 text-center shadow-lg transition-all duration-200"
				onClick={() => open()}
			>
				<div className="text-sm opacity-90">Resize Grid / Tension</div>
				<div className="text-3xl font-bold mt-1 tracking-wide">
					{numberOfColumns} × {numberOfRows}
				</div>
			</button>

			<ModalProvider ModalComponent={GridSettingsModal} />
		</>
	);
}
