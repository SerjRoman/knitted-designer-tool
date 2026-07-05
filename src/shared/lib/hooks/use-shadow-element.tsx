import { useMemo } from "react";

export function useShadowElement(
	hostId: string,
	elementId: string,
): HTMLElement | null {
	return useMemo(() => {
		if (typeof document === "undefined") return null;

		const hostContainer = document.getElementById(hostId);

		if (!hostContainer?.shadowRoot) {
			console.warn(
				`[useShadowElement]: ShadowRoot for #${hostId} not found.`,
			);
			return null;
		}

		const targetElement =
			hostContainer.shadowRoot.getElementById(elementId);

		if (!targetElement) {
			console.warn(
				`[useShadowElement]: Element #${elementId} not found inside Shadow DOM #${hostId}.`,
			);
		}

		return targetElement;
	}, [hostId, elementId]);
}
