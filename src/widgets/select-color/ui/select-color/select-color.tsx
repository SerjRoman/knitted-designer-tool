import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddColorModal } from "@/features/colors/add-color";
import { EditCustomColorModal } from "@/features/colors/edit-color";
import { getPixelsByColorWithColors } from "@/entities/canva";
import { setCurrentColor } from "@/entities/editor";
import { MAX_COLORS, useModal } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { mergeColor } from "@/features/colors/merge-color";

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
	const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
	const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

	return (
		<div className="grid grid-cols-7 gap-3 ">
			<div className="col-span-2 grid grid-rows-2 grid-cols-1 gap-3">
				<button
					onClick={() =>
						openEditColorModal({ selectedColor: currentColor })
					}
					className="row-span-1 flex items-center justify-center border border-gray-300 rounded-lg transition hover:brightness-90 cursor-pointer"
					style={{ backgroundColor: currentColor }}
				></button>
				<button
					className={`flex flex-row items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
						maxColorsExceeded && "opacity-50 cursor-not-allowed"
					}`}
					disabled={maxColorsExceeded}
					onClick={() => openAddNewColorModal()}
				>
					<PlusIcon size={20} /> Add
				</button>
			</div>
			<div className="col-span-5 grid grid-cols-4 row-auto gap-1">
				{colors.map((color, index) => (
					<button
						key={color}
						draggable
						onDragStart={(e) => {
							setDraggedIdx(index);
							e.dataTransfer.effectAllowed = "move";
						}}
						onDragOver={(e) => {
							e.preventDefault();
							if (draggedIdx !== index) {
								setDragOverIdx(index);
							}
						}}
						onDragLeave={() => setDragOverIdx(null)}
						onDrop={async (e) => {
							e.preventDefault();
							setDragOverIdx(null);
							setDraggedIdx(null);
							if (draggedIdx === null) return;
							if (draggedIdx === index) return;
							if (dragOverIdx === null) return;
							const colorToMerge = colors[draggedIdx];
							const targetColor = colors[dragOverIdx];
							if (colorToMerge === targetColor) return;
							if (!colorToMerge || !targetColor) return;

							const pointsBefore = await dispatch(
								getPixelsByColorWithColors({
									color: colors[draggedIdx],
								}),
							).unwrap();
							await dispatch(
								mergeColor({
									colorToMerge,
									newColor: targetColor,
									pixels: pointsBefore,
								}),
							);
							dispatch(setCurrentColor(colors[dragOverIdx]));
						}}
						onDragEnd={() => {
							setDraggedIdx(null);
							setDragOverIdx(null);
						}}
						className={`w-12 h-12 rounded border-2 transition-all duration-150 cursor-grab active:cursor-grabbing ${
							dragOverIdx === index
								? "border-blue-500 scale-110 z-10 shadow-md"
								: draggedIdx === index
									? "opacity-40 border-dashed border-gray-400"
									: "border-gray-200 hover:border-gray-300 transform-none"
						}`}
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
