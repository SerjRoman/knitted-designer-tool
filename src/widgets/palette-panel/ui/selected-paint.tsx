import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { drawSymbol, type StitchSymbol } from "@/entities/canva";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function SelectedPaint() {
	const { colors, symbols } = useAppSelector((s) => s.canvas);
	const { currentSymbolId = 0, currentColorId = 0 } = useAppSelector(
		(s) => s.editor,
	);

	const hostRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 1, height: 1 });

	useLayoutEffect(() => {
		const host = hostRef.current;
		const target = host?.parentElement;
		if (!target) return;

		const ro = new ResizeObserver((entries) => {
			const entry = entries[0];
			const width = Math.max(1, Math.floor(entry.contentRect.width));
			const height = Math.max(1, Math.floor(entry.contentRect.height));

			setSize((prev) =>
				prev.width === width && prev.height === height
					? prev
					: { width, height },
			);
		});
		ro.observe(target);

		return () => ro.disconnect();
	}, []);

	const draw = useCallback(
		(context: CanvasRenderingContext2D) => {
			const w = size.width;
			const h = size.height;

			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(
				0,
				0,
				context.canvas.width,
				context.canvas.height,
			);

			context.fillStyle =
				colors[currentColorId] ?? colors[0] ?? "#ffffff";
			context.fillRect(0, 0, w, h);

			if (currentSymbolId !== 0) {
				const symbol = symbols[currentSymbolId] as StitchSymbol;
				if (symbol) {
					drawSymbol(context, 0, 0, w, h, symbol);
				}
			}

			context.restore();
		},
		[colors, symbols, currentColorId, currentSymbolId, size],
	);

	return (
		<div ref={hostRef}>
			<Canvas
				draw={draw}
				width={size.width}
				height={size.height}
				aria-hidden
			/>
		</div>
	);
}
