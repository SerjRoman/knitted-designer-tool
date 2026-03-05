import type { Grid } from "@/shared/lib";

export function convertGridToColorsArray(grid: Grid): string[] {
	return grid.reduce((prev, current) => {
		prev.push(...current);
		return prev;
	}, []);
}
