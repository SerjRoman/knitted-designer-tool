import { useEffect, type RefObject } from "react";

export function useClickOutside(
	ref: RefObject<HTMLElement | null>,
	handler: () => void,
) {
	useEffect(() => {
		function handleClickOutside(event: Event) {
			const target = event.target as Node;
			const elem = ref.current;
			if (!elem) return;
			if (target == elem || elem.contains(target)) return;
			handler();
		}
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handler, ref]);
}
