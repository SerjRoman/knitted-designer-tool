import { type ChangeEvent } from "react";
import { INITIAL_TENSION_CM } from "@/entities/canva";
import { clamp } from "@/shared/lib";
import { TextInput } from "@/shared/ui/text-input";
import { Slider } from "@shared/ui/slider";

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
	const handleStitchesSlider = (newValue: number) => {
		const value = clamp(Number(newValue), 3, 100);
		onStitchesChange(value);
	};
	const handleRowsSlider = (newValue: number) => {
		const value = clamp(Number(newValue), 3, 100);
		onRowsChange(value);
	};

	const handleStitchesInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = clamp(Number(e.target.value), 3, 100);
		onStitchesChange(value);
	};
	const handleRowsInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = clamp(Number(e.target.value), 3, 100);
		onRowsChange(value);
	};

	return (
		<div className="space-y-4 border-t pt-4">
			<div className="p-2 flex flex-col gap-2 bg-gray-50 rounded">
				<span>Stitches in {INITIAL_TENSION_CM}cm</span>
				<Slider
					value={stitches}
					onChange={handleStitchesSlider}
					min={3}
					max={100}
				/>

				<TextInput
					label="Stitches"
					value={stitches}
					onChange={handleStitchesInput}
					type="number"
				/>
			</div>

			<div className="p-2 flex flex-col gap-2 bg-gray-50 rounded">
				<span>Rows in {INITIAL_TENSION_CM}cm</span>
				<Slider
					value={rows}
					onChange={handleRowsSlider}
					min={3}
					max={100}
				/>
				<TextInput
					label="Rows"
					value={rows}
					onChange={handleRowsInput}
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
