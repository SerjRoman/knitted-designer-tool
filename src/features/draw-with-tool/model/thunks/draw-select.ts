import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearSelectStartPoint, setSelectedPoints } from "@/entities/editor";
import { type AppStateSchema, type Point, getRectPoints } from "@/shared/lib";

export const drawSelect = createAsyncThunk(
    "canvas/draw-select",
    (endPoint: Point, { getState, dispatch }) => {
        const {
            editor: { toolState, selectedPoints },
        } = getState() as AppStateSchema;

        if (toolState.tool !== "select") return;

        if (!toolState.startPoint || selectedPoints) return;
        const rectSelectedPoints = getRectPoints(
            toolState.startPoint,
            endPoint
        );
        dispatch(setSelectedPoints(rectSelectedPoints));
        dispatch(clearSelectStartPoint());
    }
);
