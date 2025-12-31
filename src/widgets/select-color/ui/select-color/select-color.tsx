import { PlusIcon } from "lucide-react";
import { AddColorModal } from "@/features/add-color";
import { EditCustomColorModal } from "@/features/edit-color";
import { setCurrentColor } from "@/entities/editor";
import { MAX_COLORS, useModal } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export default function SelectColor() {
	const dispatch = useAppDispatch();
	const { currentColor } = useAppSelector((state) => state.editor);
	const { colors } = useAppSelector((state) => state.canvas);
	const [{ open: openEditColorModal }, EditColorModalProvider] = useModal<{
		selectedColor: string;
	}>();
	const [{ open: openAddNewColorModal }, ModalAddNewColorProvider] =
		useModal();
	const maxColorsExceeded = MAX_COLORS <= colors.length;
	return (
		<div className="grid grid-cols-7 gap-3 ">
			<div className="col-span-2 grid grid-rows-2 gap-3">
				<button
					onClick={() =>
						openEditColorModal({ selectedColor: currentColor })
					}
					className="row-span-1 flex items-center justify-center border border-gray-300 rounded-lg transition hover:brightness-90"
					style={{ backgroundColor: currentColor }}
				></button>
				<button
					className={`flex flex-row items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 ${
						maxColorsExceeded && "opacity-50 cursor-not-allowed"
					}`}
					disabled={maxColorsExceeded}
					onClick={() => openAddNewColorModal()}
				>
					<PlusIcon size={20} /> Add
				</button>
			</div>
			<div className="col-span-5 grid grid-cols-4 gap-1">
				{colors.map((color, index) => (
					<button
						key={index}
						className={`w-12 h-12 rounded border ${"border-gray-300"}`}
						style={{ backgroundColor: color }}
						onClick={() => dispatch(setCurrentColor(color))}
					/>
				))}
			</div>

			<EditColorModalProvider ModalComponent={EditCustomColorModal} />
			<ModalAddNewColorProvider ModalComponent={AddColorModal} />
		</div>
	);
}
