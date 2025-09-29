import { addColumn, removeColumn } from "@/entities/canvas";
import { useAppDispatch } from "@/shared/lib";

export function ChangeNumberColumns() {
	const dipsatch = useAppDispatch();
	return (
		<div>
			<button onClick={() => dipsatch(addColumn())}>Add column</button>
			<button onClick={() => dipsatch(removeColumn())}>
				Remove column
			</button>
		</div>
	);
}
