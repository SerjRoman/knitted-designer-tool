import { useEffect, useState } from "react";
import { updateGridSizes } from "@/entities/canvas";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function ChangeGridSizesModal({ onClose }: { onClose: () => void }) {
	const { numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
	const [columns, setColumns] = useState(String(numberColumns));
	const [rows, setRows] = useState(String(numberRows));

	const dispatch = useAppDispatch();

	useEffect(() => {
		setColumns(String(numberColumns));
		setRows(String(numberRows));
	}, [numberColumns, numberRows]);

	function handleChangeSizes() {
		const numberOfColumns = Number(columns);
		const numberOfRows = Number(rows);
		if (isNaN(numberOfRows) || isNaN(numberOfColumns)) {
			alert("Please enter valid numbers");
			return;
		}
		dispatch(updateGridSizes({ numberOfColumns, numberOfRows }));
		onClose();
	}
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className=" bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
				<h2 className="text-xl font-bold text-gray-800">
					Change Grid Size
				</h2>

				<div className="space-y-4">
					<div>
						<label
							htmlFor="columns-input"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Number of columns
						</label>
						<input
							id="columns-input"
							type="number"
							min={1}
							max={300}
							value={columns}
							onChange={(e) => setColumns(e.target.value)}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="rows-input"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Number of rows
						</label>
						<input
							id="rows-input"
							type="number"
							min={1}
							max={300}
							value={rows}
							onChange={(e) => setRows(e.target.value)}
							className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={handleChangeSizes}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
