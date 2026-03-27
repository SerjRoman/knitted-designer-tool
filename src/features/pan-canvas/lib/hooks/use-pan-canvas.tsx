import { useEffect, useRef, type RefObject } from "react";
import { endPanning, startPanning, setOffset } from "@/entities/viewport";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export function usePanCanvas(ref: RefObject<HTMLDivElement | null>) {
	const dispatch = useAppDispatch();
	const { offsets } = useAppSelector((state) => state.viewport);
	const { tool } = useAppSelector((state) => state.editor.toolState);

	const offsetsRef = useRef(offsets);
	const toolRef = useRef(tool);

	useEffect(() => {
		offsetsRef.current = offsets;
	}, [offsets]);

	useEffect(() => {
		toolRef.current = tool;
	}, [tool]);

	useEffect(() => {
		const containerElement = ref.current;
		if (!containerElement) return;

		let isDragging = false;
		let animationFrameId: number | null = null;
		let lastEvent: MouseEvent | null = null;

		const update = () => {
			if (!lastEvent || !isDragging) {
				animationFrameId = null;
				return;
			}

			dispatch(
				setOffset({
					x: offsetsRef.current.x + lastEvent.movementX,
					y: offsetsRef.current.y + lastEvent.movementY,
				}),
			);

			lastEvent = null;
			animationFrameId = null;
		};

		function handleMouseMove(event: MouseEvent) {
			if (!isDragging) return;
			lastEvent = event;
			if (!animationFrameId) {
				animationFrameId = requestAnimationFrame(update);
			}
		}

		function handleMouseUp() {
			if (isDragging) {
				isDragging = false;
				dispatch(endPanning());
			}

			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		}

		function handleMouseDown(event: MouseEvent) {
			if (
				event.altKey ||
				event.button === 1 ||
				event.button === 2 ||
				toolRef.current === "move"
			) {
				isDragging = true;
				dispatch(startPanning());
				event.stopPropagation();

				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			}
		}

		const handleContextMenu = (event: MouseEvent) => event.preventDefault();

		containerElement.addEventListener("mousedown", handleMouseDown);
		containerElement.addEventListener("contextmenu", handleContextMenu);

		return () => {
			containerElement.removeEventListener("mousedown", handleMouseDown);
			containerElement.removeEventListener(
				"contextmenu",
				handleContextMenu,
			);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);

			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [dispatch, ref]);
}
