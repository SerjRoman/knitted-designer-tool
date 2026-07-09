import type { Grid } from "@/shared/lib";

export const createEmptyGrid = (
	width: number,
	height: number,
	backgroundColor: number,
): Grid => {
	return Array.from({ length: height }, () =>
		Array(width).fill(backgroundColor),
	);
};
