import React, { useState, useRef, useLayoutEffect } from "react";

interface TooltipProps {
	text: string;
	position?: "top" | "bottom" | "left" | "right";
	className?: string;
	children: React.ReactNode;
}

export function Tooltip({
	text,
	position = "top",
	className,
	children,
}: Readonly<TooltipProps>) {
	const [isVisible, setIsVisible] = useState(false);
	const bubbleRef = useRef<HTMLDivElement>(null);
	const [adjustedPosition, setAdjustedPosition] = useState(position);

	useLayoutEffect(() => {
		if (!isVisible) {
			setAdjustedPosition(position);
			return;
		}

		const bubble = bubbleRef.current;
		if (!bubble) return;

		const rect = bubble.getBoundingClientRect();

		const scrollContainer = bubble.closest(
			".overflow-y-auto, [style*='overflow']",
		);

		if (scrollContainer) {
			const containerRect = scrollContainer.getBoundingClientRect();
			if (position === "top" && rect.top < containerRect.top) {
				setAdjustedPosition("bottom");
			} else if (
				position === "bottom" &&
				rect.bottom > containerRect.bottom
			) {
				setAdjustedPosition("top");
			} else {
				setAdjustedPosition(position);
			}
		} else {
			if (position === "top" && rect.top < 0) {
				setAdjustedPosition("bottom");
			} else if (
				position === "bottom" &&
				rect.bottom > window.innerHeight
			) {
				setAdjustedPosition("top");
			} else {
				setAdjustedPosition(position);
			}
		}
	}, [isVisible, position]);

	if (!text) return <>{children}</>;

	const positionClasses = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
		left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
		right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
	};

	return (
		<div
			className={`relative inline-flex items-center justify-center ${className ?? ""}`}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onFocus={() => setIsVisible(true)}
			onBlur={() => setIsVisible(false)}
		>
			{children}
			{isVisible && (
				<div
					ref={bubbleRef}
					className={`absolute z-50 pointer-events-none ${positionClasses[adjustedPosition]}`}
					role="tooltip"
				>
					<div
						className={`bg-neutral-800 text-white px-2 py-1 rounded text-[11px] max-w-50 w-max whitespace-normal wrap-break-word shadow text-center leading-normal transition-all duration-150 `}
					>
						{text}
					</div>
				</div>
			)}
		</div>
	);
}
