import { type RefObject, useEffect } from "react";
import { setZoomScale } from "@/entities/viewport";
import { MAX_ZOOM, MIN_ZOOM, ZOOM_SENSITY } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function useCanvasZoom(containerRef: RefObject<HTMLDivElement | null>) {
	const dispatch = useAppDispatch();
	const { scale } = useAppSelector((state) => state.viewport);

	useEffect(() => {
		const divElement = containerRef.current;
		if (!divElement) return;

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			const zoomDirection = event.deltaY < 0 ? 1 : -1;
			const newScale = Math.max(
				MIN_ZOOM,
				Math.min(MAX_ZOOM, scale + zoomDirection / ZOOM_SENSITY)
			);
			dispatch(setZoomScale(newScale));
		};

		divElement.addEventListener("wheel", handleWheel, {
			passive: false,
		});

		return () => {
			divElement.removeEventListener("wheel", handleWheel);
		};
	}, [containerRef, dispatch, scale]);
}
