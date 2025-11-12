import { setCurrentColor } from "@/entities/editor";
import { useAppDispatch, useAppSelector, useModal } from "@/shared/lib";
import { SelectCustomColorModal } from "../select-custom-color-modal";

export function SelectColor() {
	const dispatch = useAppDispatch();
	const { currentColor } = useAppSelector((state) => state.editor);
	const { colors } = useAppSelector((state) => state.canvas);
	const [{ open: openModal }, ModalProvider] = useModal<{
		selectedColor: string;
	}>();

	return (
		<div className="flex flex-row space-2 gap-3">
			<button
				onClick={() => openModal({ selectedColor: currentColor })}
				className="w-[15%] flex items-center justify-center bg-white border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition"
				style={{ backgroundColor: currentColor }}
			></button>
			<div className="grid grid-cols-5 gap-1">
				{colors.map((color, index) => (
					<button
						key={index}
						className={`w-12 h-12 rounded border ${"border-gray-300"}`}
						style={{ backgroundColor: color }}
						onClick={() => dispatch(setCurrentColor(color))}
					/>
				))}
			</div>

			<ModalProvider ModalComponent={SelectCustomColorModal} />
		</div>
	);
}
