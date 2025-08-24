import { COLORS } from "./colors";
import { INITIAL_PIXEL_SIZE, RULER_SIZE } from "./sizes";

export const GRID_COLOR = COLORS.red;
export const GRID_WIDTH = 800;
export const GRID_HEIGHT = 800;

export const GRID_PIXEL_WIDTH = GRID_WIDTH * INITIAL_PIXEL_SIZE;
export const GRID_PIXEL_HEIGHT = GRID_HEIGHT * INITIAL_PIXEL_SIZE;

export const CANVAS_WIDTH = GRID_PIXEL_WIDTH + RULER_SIZE;
export const CANVAS_HEIGHT = GRID_PIXEL_HEIGHT + RULER_SIZE;
