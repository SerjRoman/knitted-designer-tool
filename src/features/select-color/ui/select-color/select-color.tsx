import { setCurrentColor } from "@/entities/editor";
import { useAppDispatch, useAppSelector, useModal } from "@/shared/lib";
import { SelectCustomColorModal } from "../select-custom-color-modal";

export function SelectColor() {
	const dispatch = useAppDispatch();
	const { currentColor } = useAppSelector((state) => state.editor);
	const { colors } = useAppSelector((state) => state.canvas);
	const [{ open: openModal }, ModalProvider] = useModal();

	return (
		<div className="space-y-2">
			<h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
				Colors
			</h3>
			<div className="grid grid-cols-4 gap-1">
				{colors.map((color, index) => (
					<button
						key={index}
						className={`w-8 h-8 rounded border ${
							currentColor === color
								? "border-blue-500 ring-1 ring-blue-300"
								: "border-gray-300"
						}`}
						style={{ backgroundColor: color }}
						onClick={() => dispatch(setCurrentColor(color))}
					/>
				))}
			</div>
			<button
				onClick={() => openModal()}
				className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
			>
				Edit color
			</button>

			<ModalProvider ModalComponent={SelectCustomColorModal} />
		</div>
	);
}
