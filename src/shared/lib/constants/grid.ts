import { COLORS } from "./colors";

export const GRID_COLOR = COLORS.red;

export const GRID_X_COUNT = 20;
export const GRID_Y_COUNT = 20;

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

export const GRID_WIDTH = GRID_X_COUNT * (CANVAS_WIDTH / GRID_X_COUNT);
export const GRID_HEIGHT = GRID_Y_COUNT * (CANVAS_HEIGHT / GRID_Y_COUNT);
