import { Input, Slider, Typography } from "@mui/material";
import { type ChangeEvent } from "react";
import { INITIAL_TENSION_CM } from "@/entities/canvas";

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
	const handleStitchesSlider = (_: Event, val: number | number[]) =>
		onStitchesChange(val as number);
	const handleRowsSlider = (_: Event, val: number | number[]) =>
		onRowsChange(val as number);

	const handleStitchesInput = (e: ChangeEvent<HTMLInputElement>) => {
		onStitchesChange(Number(e.target.value));
	};
	const handleRowsInput = (e: ChangeEvent<HTMLInputElement>) => {
		onRowsChange(Number(e.target.value));
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
					min={1}
					max={100}
				/>
				<Input
					value={stitches}
					size="small"
					onChange={handleStitchesInput}
					inputProps={{ type: "number", min: 1 }}
				/>
			</div>

			<div>
				<Typography id="rows-slider">
					Rows in {INITIAL_TENSION_CM}cm
				</Typography>
				<Slider
					value={rows}
					onChange={handleRowsSlider}
					min={1}
					max={100}
				/>
				<Input
					value={rows}
					size="small"
					onChange={handleRowsInput}
					inputProps={{ type: "number", min: 1 }}
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
