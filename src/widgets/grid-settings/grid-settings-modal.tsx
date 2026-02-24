import { useState } from "react";
import { ChangeGridSizes, resizeGrid } from "@/features/resize-grid";
import { resizeTension, ResizeTensionSlider } from "@/features/resize-tension";
import {
	INITIAL_TENSION_CM,
	calculateTension,
	INITIAL_TENSION_STITCHES,
	INITIAL_TENSION_ROWS,
} from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
type GridSettingsModalProps = {
	onClose: () => void;
	isOpen: boolean;

	// Ny: skickas in via useModal.open({ onTensionChange: ... })
	onTensionChange?: (stitches: number, rows: number) => void;
};

export function GridSettingsModal({
	onClose,
	isOpen,
	onTensionChange,
}: Readonly<GridSettingsModalProps>) {
	const dispatch = useAppDispatch();

	const {
		numberOfColumns,
		numberOfRows,
		pixelWidth,
		pixelHeight,
		pixelSize,
	} = useAppSelector((state) => state.canvas);

	const [formState, setFormState] = useState({
		columns: numberOfColumns,
		rows: numberOfRows,

		// Behåller din logik, men lägger in fallback så det aldrig blir 0/NaN
		stitches: Math.max(1, Math.round(INITIAL_TENSION_CM / pixelWidth)),
		rowsTension: Math.max(1, Math.round(INITIAL_TENSION_CM / pixelHeight)),
	});

	const newPixelDimensions = calculateTension(
		formState.stitches || INITIAL_TENSION_STITCHES,
		formState.rowsTension || INITIAL_TENSION_ROWS,
	);

	const updateState = (key: keyof typeof formState, value: number) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		if (formState.columns <= 0 || formState.rows <= 0) {
			alert("Columns and Rows must be positive numbers");
			return;
		}

		dispatch(
			resizeGrid({
				newNumberOfColumns: formState.columns,
				newNumberOfRows: formState.rows,
			}),
		);

		dispatch(
			resizeTension({
				newPixelWidth: newPixelDimensions.width,
				newPixelHeight: newPixelDimensions.height,
			}),
		);

		// Ny: uppdatera värden i knappen/parenten när man klickar Apply
		onTensionChange?.(formState.stitches, formState.rowsTension);

		onClose();
	};

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			className="flex items-center justify-center z-[100]"
		>
			<div className="bg-white p-6 rounded-lg shadow-xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto w-96">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Grid Settings
					</h2>
				</div>

				<ChangeGridSizes
					columns={formState.columns}
					rows={formState.rows}
					onColumnsChange={(val) => updateState("columns", val)}
					onRowsChange={(val) => updateState("rows", val)}
				/>

				<ResizeTensionSlider
					stitches={formState.stitches}
					rows={formState.rowsTension}
					onStitchesChange={(val) => {
						updateState("stitches", val);

						// Vill du uppdatera LIVE när man drar:
						// onTensionChange?.(val, formState.rowsTension);
					}}
					onRowsChange={(val) => {
						updateState("rowsTension", val);

						// Vill du uppdatera LIVE när man drar:
						// onTensionChange?.(formState.stitches, val);
					}}
					previewWidth={newPixelDimensions.width * pixelSize}
					previewHeight={newPixelDimensions.height * pixelSize}
				/>

				<div className="flex justify-end gap-3 pt-2">
					<button
						className="items-center px-4 py-2 border border-2 text-gray-700 rounded hover:bg-gray-400 transition"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="items-center px-4 py-2 bg-[#0D5C4A] text-white rounded hover:bg-[#145245] transition"
						onClick={handleSubmit}
					>
						Apply Changes
					</button>
				</div>
			</div>
		</Modal>
	);
}
