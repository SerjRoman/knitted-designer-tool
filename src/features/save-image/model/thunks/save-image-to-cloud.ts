import {
	createAppAsyncThunk,
	RGBAToHEX,
	type RowInUploadedImage,
} from "@/shared/lib";

export const saveImageToCloud = createAppAsyncThunk(
	"editor/save-image-to-cloud",
	async (_, { getState }) => {
		const {
			canvas: { colors, grid, numberColumns, numberRows },
		} = getState();
		const hexColors = colors.map((color) => RGBAToHEX(color));
		const colorsMap = new Map<string, number>();
		for (let index = 0; index < hexColors.length; index++) {
			colorsMap.set(colors[index], index);
		}
		const rows: RowInUploadedImage[] = [];
		for (let y = 0; y < grid.length; y++) {
			const row: RowInUploadedImage = { index: y, pixels: [] };
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
		try {
			const response = await fetch(
				"https://assets.knittedforyou.com/save-json",
				{
					headers: { "Content-Type": "application/json" },
					method: "POST",
					body: JSON.stringify({
						filename: Date.now().toString() + "saved_image.json",
						content: dataToSend,
					}),
				}
			);
			const body = await response.json();
			alert(
				"Image successfully uploaded and accessible by this filename: " +
					body.filename
			);
		} catch (error) {
			console.log(error);
		}
		return dataToSend;
	}
);
