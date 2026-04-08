import { useEffect, type RefObject } from "react";
import { ROOT, MODAL_ROOT } from "../../config/dom";
import { useShadowElement } from "./use-shadow-element";

export function useClickOutside(
	ref: RefObject<HTMLElement | null>,
	handler: () => void,
) {
	const bodyContainer = useShadowElement(ROOT, MODAL_ROOT);

	useEffect(() => {
		if (!bodyContainer) return;
		function handleClickOutside(event: Event) {
			console.log("Mouse down in use-click-outside", { event });
			const target = event.target as Node;
			const elem = ref.current;
			if (!elem) return;
			if (target == elem || elem.contains(target)) return;
			handler();
		}
		bodyContainer.addEventListener("mousedown", handleClickOutside);

		return () => {
			bodyContainer.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handler, ref, bodyContainer]);
}
