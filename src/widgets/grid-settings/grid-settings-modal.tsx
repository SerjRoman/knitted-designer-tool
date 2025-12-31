import { Button } from "@mui/material";
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

export function GridSettingsModal({
	onClose,
	isOpen,
}: Readonly<{ onClose: () => void; isOpen: boolean }>) {
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
		stitches: Math.round(INITIAL_TENSION_CM / pixelWidth),
		rowsTension: Math.round(INITIAL_TENSION_CM / pixelHeight),
	});

	const newPixelDimensions = calculateTension(
		formState.stitches || INITIAL_TENSION_STITCHES,
		formState.rowsTension || INITIAL_TENSION_ROWS
	);

	const handleSubmit = () => {
		if (formState.columns <= 0 || formState.rows <= 0) {
			alert("Columns and Rows must be positive numbers");
			return;
		}

		dispatch(
			resizeGrid({
				newNumberOfColumns: formState.columns,
				newNumberOfRows: formState.rows,
			})
		);

		dispatch(
			resizeTension({
				newPixelWidth: newPixelDimensions.width,
				newPixelHeight: newPixelDimensions.height,
			})
		);

		onClose();
	};

	const updateState = (key: keyof typeof formState, value: number) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			className="fixed inset-0 flex items-center justify-center z-[100]"
		>
			<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
				<h2 className="text-xl font-bold text-gray-800">
					Grid Settings
				</h2>

				<ChangeGridSizes
					columns={formState.columns}
					rows={formState.rows}
					onColumnsChange={(val) => updateState("columns", val)}
					onRowsChange={(val) => updateState("rows", val)}
				/>

				<ResizeTensionSlider
					stitches={formState.stitches}
					rows={formState.rowsTension}
					onStitchesChange={(val) => updateState("stitches", val)}
					onRowsChange={(val) => updateState("rowsTension", val)}
					previewWidth={newPixelDimensions.width * pixelSize}
					previewHeight={newPixelDimensions.height * pixelSize}
				/>

				<div className="flex justify-end gap-3 pt-2">
					<Button
						variant="outlined"
						color="inherit"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Apply Changes
					</Button>
				</div>
			</div>
		</Modal>
	);
}
