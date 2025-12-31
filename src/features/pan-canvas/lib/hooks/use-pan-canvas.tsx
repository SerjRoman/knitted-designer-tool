import { useEffect, type RefObject } from "react";
import { endPanning, startPanning, setOffset } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function usePanCanvas(ref: RefObject<HTMLDivElement | null>) {
	const dispatch = useAppDispatch();
	const { isPanning, offsets } = useAppSelector((state) => state.viewport);

	useEffect(() => {
		const containerElement = ref.current;
		if (!containerElement) return;

		function handleMouseDown(event: MouseEvent) {
			if (event.altKey || event.button === 2) {
				dispatch(startPanning());
			}
		}
		function handleMouseUp() {
			if (isPanning) dispatch(endPanning());
		}
		let animationFrameId: number | null = null;
		let lastEvent: MouseEvent | null = null;
		const update = () => {
			if (!lastEvent) {
				animationFrameId = null;
				return;
			}

			if (isPanning) {
				dispatch(
					setOffset({
						x: offsets.x + lastEvent.movementX,
						y: offsets.y + lastEvent.movementY,
					})
				);
			}
			lastEvent = null;
			animationFrameId = null;
		};

		function handleMouseMove(event: MouseEvent) {
			const isRightMouseButtonDown = (event.buttons & 2) === 2;

			if ((event.altKey || isRightMouseButtonDown) && isPanning) {
				lastEvent = event;
				if (!animationFrameId) {
					animationFrameId = requestAnimationFrame(update);
				}
			}
		}
		const handleContextMenu = (event: MouseEvent) => event.preventDefault();

		containerElement.addEventListener("mousedown", handleMouseDown);
		containerElement.addEventListener("mouseup", handleMouseUp);
		containerElement.addEventListener("mouseleave", handleMouseUp);
		containerElement.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			containerElement.removeEventListener(
				"contextmenu",
				handleContextMenu
			);
			containerElement.removeEventListener("mousedown", handleMouseDown);
			containerElement.removeEventListener("mouseup", handleMouseUp);
			containerElement.removeEventListener("mousemove", handleMouseMove);
		};
	}, [dispatch, isPanning, offsets, ref]);
}
