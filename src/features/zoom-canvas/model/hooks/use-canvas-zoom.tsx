import { type RefObject, useEffect } from "react";
import { updateZoomScale } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export function useCanvasZoom(canvasRef: RefObject<HTMLCanvasElement | null>) {
	const dispatch = useAppDispatch();
	const { pixelSize } = useAppSelector((state) => state.canvas);
	useEffect(() => {
		const canvasElement = canvasRef.current;
		if (!canvasElement) return;

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			const zoomDirection = event.deltaY < 0 ? 1 : -1;
			const newScale = zoomDirection / 100;
			dispatch(updateZoomScale(newScale));
		};

		canvasElement.addEventListener("wheel", handleWheel, {
			passive: false,
		});

		return () => {
			canvasElement.removeEventListener("wheel", handleWheel);
		};
	}, [canvasRef, dispatch, pixelSize]);
}
