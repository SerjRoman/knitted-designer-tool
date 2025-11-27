import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppStateSchema } from "@/app/ambient";
import { applyFlip } from "@/entities/canvas";
import { setSelectedPoints } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { getBoundingBox, type PointWithColor } from "@/shared/lib";

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
		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];

		const { minX, maxX, minY, maxY } = getBoundingBox(selectedPoints);

		selectedPoints.forEach((point) => {
			const color = grid[point.y]?.[point.x] ?? backgroundColor;

			const newX =
				direction === "horizontal" ? minX + maxX - point.x : point.x;
			const newY =
				direction === "vertical" ? minY + maxY - point.y : point.y;
			const pointBefore: PointWithColor = {
				...point,
				color,
			};
			const pointAfter: PointWithColor = {
				x: Math.floor(newX),
				y: Math.floor(newY),
				color,
			};
			pointsAfter.push(pointAfter);
			pointsBefore.push(pointBefore);
		});

		const pixelsToClear = selectedPoints;
		const newSelectedPoints = pointsAfter.map(({ x, y }) => ({ x, y }));

		dispatch(applyFlip({ pixelsToClear, pixelsToApply: pointsAfter }));

		dispatch(setSelectedPoints(newSelectedPoints));

		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsAfter,
					pointsBefore,
				},
			})
		);
	}
);
