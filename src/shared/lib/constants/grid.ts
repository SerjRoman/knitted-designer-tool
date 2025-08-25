import { COLORS } from "./colors";
import { INITIAL_PIXEL_SIZE, RULER_SIZE } from "./sizes";

export const GRID_COLOR = COLORS.red;
export const GRID_X_COUNT = 40;
export const GRID_Y_COUNT = 40;

export const GRID_WIDTH = GRID_X_COUNT * INITIAL_PIXEL_SIZE;
export const GRID_HEIGHT = GRID_Y_COUNT * INITIAL_PIXEL_SIZE;

export const CANVAS_WIDTH = GRID_WIDTH + RULER_SIZE;
export const CANVAS_HEIGHT = GRID_HEIGHT + RULER_SIZE;
