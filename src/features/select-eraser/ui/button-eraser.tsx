import { setEraser } from "@/entities/canvas";
import { useAppDispatch } from "@/shared/lib";

export function ButtonEraser() {
	const dispatch = useAppDispatch();
	return <button onClick={() => dispatch(setEraser())}>Eraser</button>;
}
