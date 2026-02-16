import { TextField } from "@mui/material";
import { type ChangeEvent } from "react";
import { clamp } from "@/shared/lib";

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
		const val = clamp(Number(e.target.value), 1, 100);
		onColumnsChange(val);
	};

	const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = clamp(Number(e.target.value), 1, 100);
		onRowsChange(val);
	};

	return (
		<div className="space-y-4">
			<div>
				<TextField
					type="number"
					label="Number of columns"
					size="small"
					value={columns}
					onChange={handleColChange}
				/>
			</div>
			<div>
				<TextField
					type="number"
					label="Number of rows"
					size="small"
					value={rows}
					onChange={handleRowChange}
				/>
			</div>
		</div>
	);
}
