import { useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/shared/lib";
import styles from "./modal.module.css";
import type { IModalProps } from "./modal.types";

export function Modal(props: IModalProps) {
	const {
		isOpen,
		onClose,
		children,
		className,
		doCloseOnClickOutside = false,
	} = props;

	const contentRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(contentRef, () => {
		if (doCloseOnClickOutside) onClose();
	});
	if (!isOpen) return null;
	return createPortal(
		<div className={styles.overlay}>
			<div className={className} ref={contentRef}>
				{children}
			</div>
		</div>,
		document.body
	);
}
