import { addRow, removeRow } from "@/entities/canvas";
import { useAppDispatch } from "@/shared/lib";

export function ChangeNumberRows() {
	const dipsatch = useAppDispatch();
	return (
		<div>
			<button onClick={() => dipsatch(addRow())}>Add row</button>
			<button onClick={() => dipsatch(removeRow())}>Remove row</button>
		</div>
	);
}
