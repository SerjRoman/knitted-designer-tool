import { useRef } from "react";
import { createPortal } from "react-dom";
import { MODAL_ROOT, ROOT } from "../../config/dom";
import { useClickOutside } from "../../lib/hooks/use-click-outside";
import { useShadowElement } from "../../lib/hooks/use-shadow-element";
import type { IModalProps } from "./modal.types";

export function Modal(props: IModalProps) {
	const {
		isOpen,
		onClose,
		children,
		className,
		doCloseOnClickOutside = false,
	} = props;
	const bodyContainer = useShadowElement(ROOT, MODAL_ROOT);

	const contentRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(contentRef, () => {
		if (doCloseOnClickOutside) onClose();
	});
	if (!isOpen) return null;
	return createPortal(
		<div
			className={
				"fixed inset-0 z-[500] bg-black/30 flex items-center justify-center"
			}
			data-modal-open="true"
		>
			<div className={className} ref={contentRef}>
				{children}
			</div>
		</div>,
		bodyContainer || document.body,
	);
}
