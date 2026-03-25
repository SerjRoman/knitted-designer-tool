import { useState, type InputHTMLAttributes } from "react";
import { clamp } from "@/shared/lib";

interface SliderProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "onChange"
> {
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
	classNames?: {
		container?: string;
		track?: string;
		thumb?: string;
	};
}

export function Slider(props: Readonly<SliderProps>) {
	const { min, max, value, onChange, classNames, disabled, step } = props;
	const [isDragging, setIsDragging] = useState(false);

	const safeRange = max - min || 1;
	const safeValue = clamp(value, min, max);
	const left = ((safeValue - min) / safeRange) * 100;

	const numericStep =
		typeof step === "number"
			? step
			: typeof step === "string" && step !== "any"
				? Number(step)
				: 1;

	const safeStep =
		Number.isFinite(numericStep) && numericStep > 0 ? numericStep : 1;
	const stepDecimals = (safeStep.toString().split(".")[1] || "").length;

	const roundToStep = (raw: number) => {
		const snapped = min + Math.round((raw - min) / safeStep) * safeStep;
		return Number(clamp(snapped, min, max).toFixed(stepDecimals));
	};

	const setValueFromClientX = (clientX: number, rect: DOMRect) => {
		const relativeX = clamp(clientX - rect.left, 0, rect.width);
		const next = (relativeX / rect.width) * (max - min) + min;
		onChange(roundToStep(next));
	};

	return (
		<div
			className={`relative h-4  touch-none select-none ${
				classNames?.container || ""
			} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
			onPointerDown={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				setValueFromClientX(event.clientX, rect);
				setIsDragging(true);
				event.currentTarget.setPointerCapture(event.pointerId);
			}}
			onPointerMove={(event) => {
				if (!isDragging) return;
				const rect = event.currentTarget.getBoundingClientRect();
				setValueFromClientX(event.clientX, rect);
			}}
			onPointerUp={(event) => {
				setIsDragging(false);
				if (event.currentTarget.hasPointerCapture(event.pointerId)) {
					event.currentTarget.releasePointerCapture(event.pointerId);
				}
			}}
			onPointerCancel={(event) => {
				setIsDragging(false);
				if (event.currentTarget.hasPointerCapture(event.pointerId)) {
					event.currentTarget.releasePointerCapture(event.pointerId);
				}
			}}
		>
			<div
				className={`absolute top-1/2 -translate-y-1/2 bg-blue-200 w-full h-1 rounded ${
					classNames?.track || ""
				}`}
			/>
			<div
				className={`absolute top-1/2 -translate-y-1/2 bg-blue-500 h-1 rounded ${
					classNames?.track || ""
				}`}
				style={{ width: `${left}%` }}
			/>
			<div
				className={`absolute top-1/2 z-10 bg-blue-600 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 transition-shadow ${
					classNames?.thumb || ""
				} ${isDragging ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white" : ""}`}
				style={{ left: `${left}%` }}
			/>
		</div>
	);
}
