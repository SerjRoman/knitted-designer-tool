import { Input, TextField, Typography } from "@mui/material"
import { type ChangeEvent } from "react"
import Slider from "./Slider"
import { clamp } from "@/shared/lib"

interface ChangeGridSizesProps {
  columns: number
  rows: number
  onColumnsChange: (value: number) => void
  onRowsChange: (value: number) => void
}

export function ChangeGridSizes({
  columns,
  rows,
  onColumnsChange,
  onRowsChange,
}: Readonly<ChangeGridSizesProps>) {
	const handleColChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = clamp(Number(e.target.value), 1, 100);
		onColumnsChange(val);
	};

	const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = clamp(Number(e.target.value), 1, 100);
		onRowsChange(val);
	};
	return (
		<div className="space-y-4">
          <div className="flex flex-col gap-2 ">
            <Typography id="rows-slider">Number of columns</Typography>

            <div className="flex items-center gap-2">
        	  <Slider
        	    value={[columns]}
        	    min={1}
        	    max={200}
        	    step={1}
        	    onValueChange={(v) => onColumnsChange(v[0] ?? 1)}
        	    className="w-full max-w-xs "
        	  />

        	  <Input
        	   value={columns}
        	   size="small"
        	   onChange={handleColChange}
        	   inputProps={{ type: "number", min: 1 }}
        	/>
		</div>
      </div>

		

      <div className="flex flex-col gap-2 ">
        <Typography id="rows-slider">Number of rows</Typography>

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
        	  onChange={handleRowChange}
        	  inputProps={{ type: "number", min: 1 }}
        	/>
		</div>
      </div>
    </div>
	
  )
}
