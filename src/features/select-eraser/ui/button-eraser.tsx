import { selectTool } from "@/entities/editor";
import { useAppDispatch } from "@/shared/lib";

export function ButtonEraser() {
	const dispatch = useAppDispatch();
	return (
		<button onClick={() => dispatch(selectTool("eraser"))}>Eraser</button>
	);
}
