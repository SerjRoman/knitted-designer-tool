import { type ChangeEvent } from "react";
import { INITIAL_TENSION_CM } from "@/entities/canvas";
import { clamp } from "@/shared/lib";
import { Input,  Typography } from "@mui/material";
import Slider from "@/features/resize-grid/ui/change-grid-sizes/Slider";

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
	const handleStitchesSlider = (e: ChangeEvent<HTMLInputElement>) => {
		onStitchesChange(Number(e.target.value));
	};
	const handleRowsSlider = (e: ChangeEvent<HTMLInputElement>) => {
		const clampedValue = clamp(Number(e.target.value), 3, 100);
		onRowsChange(clampedValue);
	};

	return (
		<div className="space-y-4 border-t pt-4">
			<div className="flex flex-col gap-2">
				<Typography id="stitch-slider">
					Stitches in {INITIAL_TENSION_CM}cm
				</Typography>
      		  <div className="flex items-center gap-2">
      		  	<Slider
      		  	  value={[stitches]}
      		  	  min={1}
      		  	  max={200}
      		  	  step={1}
      		  	  onValueChange={(v) => onStitchesChange(v[0] ?? 1)}
      		  	  className="w-full max-w-xs "
      		  	/>

      		  	<Input
      		  	  value={stitches}
      		  	  size="small"
      		  	  onChange={handleStitchesSlider}
      		  	  inputProps={{ type: "number", min: 1 }}
      		  	/>
				</div>
      		</div>


			  <div className="flex flex-col gap-2">
				<Typography id="stitch-slider">
					Rows in {INITIAL_TENSION_CM}cm
				</Typography>
      		  <div className="flex items-center gap-2">
      		  	<Slider
      		  	  value={[rows]}
      		  	  min={1}
      		  	  max={200}
      		  	  step={1}
      		  	  onValueChange={(v) => onRowsChange(v[0] ?? 1)}
      		  	  className="w-full max-w-xs "
      		  	/>

      		  	<Input
      		  	  value={rows}
      		  	  size="small"
      		  	  onChange={handleRowsSlider}
      		  	  inputProps={{ type: "number", min: 1 }}
      		  	/>
				</div>
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
