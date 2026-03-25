import { type ChangeEvent } from "react";
import { clamp } from "@/shared/lib";
import { TextInput } from "@/shared/ui/text-input";

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
		const val = clamp(Number(e.target.value), 1, 200);
		onColumnsChange(val);
	};

	const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = clamp(Number(e.target.value), 1, 200);
		onRowsChange(val);
	};

	return (
		<div className="space-y-4">
			<div>
				<TextInput
					type="number"
					label="Number of columns"
					value={columns}
					onChange={handleColChange}
				/>
			</div>
			<div>
				<TextInput
					type="number"
					label="Number of rows"
					value={rows}
					onChange={handleRowChange}
				/>
			</div>
		</div>
	);
}
