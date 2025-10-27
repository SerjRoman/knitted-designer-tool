import { createAppAsyncThunk, RGBAToHEX } from "@/shared/lib";

type Pixel = { color: number; count: number };

type Row = {
	index: number;
	pixels: Pixel[];
};

export const saveImageToCloud = createAppAsyncThunk(
	"editor/save-image-to-cloud",
	(_, { getState }) => {
		const {
			canvas: { colors, grid, numberColumns, numberRows },
		} = getState();
		const hexColors = colors.map((color) => RGBAToHEX(color));
		const colorsMap = new Map<string, number>();
		for (let index = 0; index < hexColors.length; index++) {
			colorsMap.set(colors[index], index);
		}
		const rows: Row[] = [];
		for (let y = 0; y < grid.length; y++) {
			const row: Row = { index: y, pixels: [] };
			for (let x = 0; x < grid[y].length; x++) {
				const lastPixel = row.pixels.at(-1);
				const currentColor = grid[y][x];
				const colorIndex = colorsMap.get(currentColor)!;
				if (lastPixel && lastPixel.color === colorIndex) {
					lastPixel.count++;
					continue;
				} else {
					row.pixels.push({ color: colorIndex, count: 1 });
				}
			}
			rows.push(row);
		}
		const dataToSend = {
			width: numberColumns,
			height: numberRows,
			colors: hexColors,
			rows,
		};
		console.log(dataToSend);
		return dataToSend;
	}
);
