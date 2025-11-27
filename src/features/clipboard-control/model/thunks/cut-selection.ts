import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixels } from "@/entities/canvas";
import { addActionToHistory } from "@/entities/history";
import type { AppStateSchema, PointWithColor } from "@/shared/lib";
import { copySelection } from "./copy-selection";

export const cutSelection = createAsyncThunk(
    "editor/copy-selection",
    async (_, { getState, dispatch }) => {
        const {
            editor: { selectedPoints },
            canvas: { grid },
        } = getState() as AppStateSchema;
        const {
            canvas: { backgroundColor },
        } = getState() as AppStateSchema;
        if (!selectedPoints || selectedPoints.length === 0) return;
        const pointsToClear = [...selectedPoints];
        const pointsBefore: PointWithColor[] = [];
        const pointsAfter: PointWithColor[] = [];
        pointsToClear.forEach((point) => {
            const pointBefore = {
                color: grid[point.y][point.x],
                x: point.x,
                y: point.y,
            };
            const pointAfter = {
                color: backgroundColor,
                x: point.x,
                y: point.y,
            };
            pointsAfter.push(pointAfter);
            pointsBefore.push(pointBefore);
        });
        await dispatch(copySelection());

        dispatch(setPixels({ points: pointsToClear, color: backgroundColor }));

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
