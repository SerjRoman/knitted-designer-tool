import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixels } from "@/entities/canvas";
import { clearShapeState } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
    getRectPoints,
    type AppStateSchema,
    type Point,
    type PointWithColor,
} from "@/shared/lib";

export const drawRect = createAsyncThunk(
    "canvas/draw-rect",
    (endPoint: Point, { getState, dispatch }) => {
        const {
            editor: { currentColor, toolState },
        } = getState() as AppStateSchema;
        const {
            canvas: { grid },
        } = getState() as AppStateSchema;
        if (
            toolState.tool !== "shape" ||
            toolState.shape !== "rect" ||
            !toolState.startPoint
        )
            return;
        const pointsToFill = getRectPoints(toolState.startPoint, endPoint);

        const pointsBefore: PointWithColor[] = [];
        const pointsAfter: PointWithColor[] = [];
        pointsToFill.forEach((point) => {
            const oldColor = grid[point.y][point.x];
            pointsBefore.push({ ...point, color: oldColor });
            pointsAfter.push({ ...point, color: currentColor });
        });

        dispatch(setPixels({ points: pointsToFill, color: currentColor }));
        dispatch(clearShapeState());

        dispatch(
            addActionToHistory({
                type: "DRAW",
                payload: {
                    pointsBefore,
                    pointsAfter,
                },
            })
        );
    }
);
