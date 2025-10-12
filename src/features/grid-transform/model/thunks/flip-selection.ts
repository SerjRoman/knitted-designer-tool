import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppStateSchema } from "@/app/ambient";
import { applyFlip } from "@/entities/canvas";
import { setSelectedPoints } from "@/entities/editor";
import { getBoundingBox } from "@/shared/lib";

type FlipDirection = "horizontal" | "vertical";

export const flipSelection = createAsyncThunk(
	"canvas/flip-selection",
	async (direction: FlipDirection, { getState, dispatch }) => {
		const state = getState() as AppStateSchema;
		const { selectedPoints } = state.editor;
		const { grid, backgroundColor } = state.canvas;

		if (!selectedPoints || selectedPoints.length === 0) {
			return;
		}

		const { minX, maxX, minY, maxY } = getBoundingBox(selectedPoints);

		const pixelsToApply = selectedPoints.map((point) => {
			const color = grid[point.y]?.[point.x] ?? backgroundColor;

			const newX =
				direction === "horizontal" ? minX + maxX - point.x : point.x;
			const newY =
				direction === "vertical" ? minY + maxY - point.y : point.y;

			return {
				x: Math.floor(newX),
				y: Math.floor(newY),
				color,
			};
		});

		const pixelsToClear = selectedPoints;
		const newSelectedPoints = pixelsToApply.map(({ x, y }) => ({ x, y }));

		dispatch(applyFlip({ pixelsToClear, pixelsToApply }));

		dispatch(setSelectedPoints(newSelectedPoints));
	}
);
