import { type RefObject, useEffect } from "react";
import { setPixelSize } from "@/entities/canvas";
import {
	useAppDispatch,
	useAppSelector,
	MIN_PIXEL_SIZE,
	MAX_PIXEL_SIZE,
} from "@/shared/lib";

export function useCanvasZoom(canvasRef: RefObject<HTMLCanvasElement | null>) {
	const dispatch = useAppDispatch();
	const { pixelSize } = useAppSelector((state) => state.canvas);

	useEffect(() => {
		const canvasElement = canvasRef.current;
		if (!canvasElement) return;

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			const zoomDirection = event.deltaY < 0 ? 1 : -1;

			const newPixelSize = pixelSize + zoomDirection;
			if (
				newPixelSize >= MIN_PIXEL_SIZE &&
				newPixelSize <= MAX_PIXEL_SIZE
			) {
				dispatch(setPixelSize(newPixelSize));
			}
		};

		canvasElement.addEventListener("wheel", handleWheel, {
			passive: false,
		});

		return () => {
			canvasElement.removeEventListener("wheel", handleWheel);
		};
	}, [canvasRef, dispatch, pixelSize]);
}
