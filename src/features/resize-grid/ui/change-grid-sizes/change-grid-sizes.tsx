import { Input, Typography } from "@mui/material";
import { type ChangeEvent } from "react";

interface ChangeGridSizesProps {
	columns: number;
	rows: number;
	onColumnsChange: (value: number) => void;
	onRowsChange: (value: number) => void;
}

export function ChangeGridSizes({
	columns,
	rows,
	onColumnsChange,
	onRowsChange,
}: Readonly<ChangeGridSizesProps>) {
	const handleColChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === "" ? 0 : Number(e.target.value);
		onColumnsChange(val);
	};

	const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === "" ? 0 : Number(e.target.value);
		onRowsChange(val);
	};

	return (
		<div className="space-y-4">
			<div>
				<Typography className="text-sm font-medium text-gray-700 mb-1">
					Number of columns
				</Typography>
				<Input
					fullWidth
					value={columns}
					onChange={handleColChange}
					inputProps={{ type: "number", min: 1, step: 1 }}
				/>
			</div>
			<div>
				<Typography className="text-sm font-medium text-gray-700 mb-1">
					Number of rows
				</Typography>
				<Input
					fullWidth
					value={rows}
					onChange={handleRowChange}
					inputProps={{ type: "number", min: 1, step: 1 }}
				/>
			</div>
		</div>
	);
}
