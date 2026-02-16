import { TextField, Slider, Typography } from "@mui/material";
import { type ChangeEvent } from "react";
import { INITIAL_TENSION_CM } from "@/entities/canvas";
import { clamp } from "@/shared/lib";

interface ResizeTensionSliderProps {
	stitches: number;
	rows: number;
	onStitchesChange: (val: number) => void;
	onRowsChange: (val: number) => void;
	previewWidth: number;
	previewHeight: number;
}

export function ResizeTensionSlider({
	stitches,
	rows,
	onStitchesChange,
	onRowsChange,
	previewWidth,
	previewHeight,
}: Readonly<ResizeTensionSliderProps>) {
	const handleStitchesSlider = (_: Event, val: number | number[]) => {
		const value = clamp(Number(val), 3, 100);
		onStitchesChange(value);
	};
	const handleRowsSlider = (_: Event, val: number | number[]) => {
		const value = clamp(Number(val), 3, 100);
		onRowsChange(value);
	};

	const handleStitchesTextField = (e: ChangeEvent<HTMLInputElement>) => {
		const value = clamp(Number(e.target.value), 3, 100);
		onStitchesChange(value);
	};
	const handleRowsTextField = (e: ChangeEvent<HTMLInputElement>) => {
		const value = clamp(Number(e.target.value), 3, 100);
		onRowsChange(value);
	};

	return (
		<div className="space-y-4 border-t pt-4">
			<div>
				<Typography id="stitch-slider">
					Stitches in {INITIAL_TENSION_CM}cm
				</Typography>
				<Slider
					value={stitches}
					onChange={handleStitchesSlider}
					aria-labelledby="stitch-slider"
					min={3}
					max={100}
				/>
				<TextField
					label="Stitches"
					value={stitches}
					size="small"
					onChange={handleStitchesTextField}
					type="number"
				/>
			</div>

			<div>
				<Typography id="rows-slider">
					Rows in {INITIAL_TENSION_CM}cm
				</Typography>
				<Slider
					value={rows}
					onChange={handleRowsSlider}
					aria-labelledby="rows-slider"
					min={3}
					max={100}
				/>
				<TextField
					label="Rows"
					value={rows}
					size="small"
					onChange={handleRowsTextField}
					type="number"
				/>
			</div>

			<div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded">
				<span className="text-xs text-gray-500">
					Preview (1 stitch):
				</span>
				<div
					style={{
						width: previewWidth,
						height: previewHeight,
						backgroundColor: "black",
					}}
				/>
			</div>
		</div>
	);
}
