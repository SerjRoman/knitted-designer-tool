import React, { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useShadowElement } from "../../lib/hooks/use-shadow-element";
import { MODAL_ROOT, ROOT } from "../../config/dom";

interface TooltipProps {
	text: string;
	position?: "top" | "bottom" | "left" | "right";
	className?: string;
	children: React.ReactNode;
	container?: HTMLElement | null;
}

export function Tooltip({
	text,
	position = "top",
	className,
	children,
	container,
}: Readonly<TooltipProps>) {
	const [isVisible, setIsVisible] = useState(false);
	const triggerRef = useRef<HTMLDivElement>(null);
	const bubbleRef = useRef<HTMLDivElement>(null);
	const [coords, setCoords] = useState({ top: 0, left: 0 });

	const bodyContainer = useShadowElement(ROOT, MODAL_ROOT);
	const targetContainer =
		container !== undefined
			? container
			: bodyContainer ||
				(typeof document !== "undefined" ? document.body : null);

	useLayoutEffect(() => {
		if (!isVisible) {
			return;
		}

		const trigger = triggerRef.current;
		const bubble = bubbleRef.current;
		if (!trigger || !bubble) return;

		const triggerRect = trigger.getBoundingClientRect();
		const bubbleRect = bubble.getBoundingClientRect();

		let currentPosition = position;

		if (position === "top" && triggerRect.top - bubbleRect.height - 6 < 0) {
			currentPosition = "bottom";
		} else if (
			position === "bottom" &&
			triggerRect.bottom + bubbleRect.height + 6 > window.innerHeight
		) {
			currentPosition = "top";
		}

		let top = 0;
		let left = 0;

		if (currentPosition === "top") {
			left =
				triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
			top = triggerRect.top - bubbleRect.height - 6;
		} else if (currentPosition === "bottom") {
			left =
				triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
			top = triggerRect.bottom + 6;
		} else if (currentPosition === "left") {
			left = triggerRect.left - bubbleRect.width - 6;
			top =
				triggerRect.top +
				triggerRect.height / 2 -
				bubbleRect.height / 2;
		} else if (currentPosition === "right") {
			left = triggerRect.right + 6;
			top =
				triggerRect.top +
				triggerRect.height / 2 -
				bubbleRect.height / 2;
		}

		left = Math.max(
			6,
			Math.min(left, window.innerWidth - bubbleRect.width - 6),
		);
		top = Math.max(
			6,
			Math.min(top, window.innerHeight - bubbleRect.height - 6),
		);

		setCoords({ top, left });
	}, [isVisible, position]);

	if (!text) return <>{children}</>;

	return (
		<div
			ref={triggerRef}
			className={`relative inline-flex items-center justify-center ${className ?? ""}`}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onFocus={() => setIsVisible(true)}
			onBlur={() => setIsVisible(false)}
		>
			{children}
			{isVisible &&
				targetContainer &&
				createPortal(
					<div
						ref={bubbleRef}
						className="fixed z-500 pointer-events-none"
						style={{
							top: `${coords.top}px`,
							left: `${coords.left}px`,
						}}
						role="tooltip"
					>
						<div className="bg-neutral-800 text-white px-2 py-1 rounded text-[11px] max-w-50 w-max whitespace-normal wrap-break-word shadow text-center leading-normal transition-all duration-150">
							{text}
						</div>
					</div>,
					targetContainer,
				)}
		</div>
	);
}
