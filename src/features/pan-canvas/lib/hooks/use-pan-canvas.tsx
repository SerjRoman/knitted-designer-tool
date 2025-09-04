import { useEffect, type RefObject } from "react";
import { endPanning, startPanning, setOffset } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function usePanCanvas(ref: RefObject<HTMLDivElement | null>) {
	const dispatch = useAppDispatch();
	const { isPanning, offsets } = useAppSelector((state) => state.viewport);

	useEffect(() => {
		const containerElement = ref.current;
		if (!containerElement) return;

		function handleMouseDown(event: MouseEvent) {
			if (event.altKey) {
				dispatch(startPanning());
			}
		}
		function handleMouseUp() {
			dispatch(endPanning());
		}
		function handleMouseMove(event: MouseEvent) {
			if (event.altKey && isPanning) {
				// обновляем pan относительно прошлого значения
				dispatch(
					setOffset({
						x: offsets.x + event.movementX,
						y: offsets.y + event.movementY,
					})
				);

				// обновляем lastPos для следующего кадра
			}
		}
		containerElement.addEventListener("mousedown", handleMouseDown);
		containerElement.addEventListener("mouseup", handleMouseUp);
		containerElement.addEventListener("mousemove", handleMouseMove);
		return () => {
			containerElement.removeEventListener("mousedown", handleMouseDown);
			containerElement.removeEventListener("mouseup", handleMouseUp);
			containerElement.removeEventListener("mousemove", handleMouseMove);
		};
	}, [dispatch, isPanning, offsets.x, offsets.y, ref]);
}
