import { selectGrid, setColors } from "@/entities/canva";
import {
	approximateColors,
	getBoundingBox,
	getImageDataFromImage,
	getPopularColorsFromRGBArray,
	MAX_COLORS,
	type Point,
	type PointWithColor,
	type RGBColor,
} from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";
import {
	convertImageDataToRGBArray,
	createPointsFromImage,
	quantizeRGBArrayByPalette,
} from "../../lib";
import { addReferenceImage } from "../slices/reference.slice";

interface ProcessImagePayload {
	file: File;
	width: number;
	height: number;
}

export const processAndUploadImage = createAppAsyncThunk<
	{ points: PointWithColor[]; originPoint: Point },
	ProcessImagePayload
>(
	"features/uploadImage/process",
	async (
		{ file, width, height },
		{ dispatch, getState, rejectWithValue },
	) => {
		return await new Promise<{
			points: PointWithColor[];
			originPoint: Point;
		}>((resolve, reject) => {
			const reader = new FileReader();
			const state = getState();
			const grid = selectGrid(state);
			const previewUrl = URL.createObjectURL(file);
			reader.onload = (e) => {
				const img = new Image();
				img.onerror = () => reject(new Error("Failed to load image"));
				img.onload = () => {
					const resizedImageData = getImageDataFromImage({
						source: img,
						width,
						height,
					});

					const RGBArray =
						convertImageDataToRGBArray(resizedImageData);
					const sameColors = new Set<string>();
					const usedColors: RGBColor[] = [];
					grid.forEach((row) => {
						row.forEach((cell) => {
							const [r, g, b] = cell.match(/\d+/g)!.map(Number);
							const key = `r${r},g${g},b${b}}`;
							const rgbColor: RGBColor = { r, g, b };
							if (!sameColors.has(key)) {
								usedColors.push(rgbColor);
								sameColors.add(key);
							}
						});
					});
					const popularColors = getPopularColorsFromRGBArray(
						RGBArray,
						MAX_COLORS,
					);
					const finalColors = approximateColors(
						usedColors,
						popularColors,
					);
					const stringifiedColors = finalColors.map(
						(color) => `rgb(${color.r}, ${color.g}, ${color.b})`,
					);
					const quantizedRGBArray = quantizeRGBArrayByPalette(
						RGBArray,
						finalColors,
					);
					const points = createPointsFromImage(
						quantizedRGBArray,
						width,
						height,
					);

					const { maxX, maxY, minX, minY } = getBoundingBox(points);
					const centerX = Math.floor((minX + maxX) / 2);
					const centerY = Math.floor((minY + maxY) / 2);
					const originPoint = { x: centerX, y: centerY };

					dispatch(setColors(stringifiedColors));
					dispatch(
						addReferenceImage({
							imageUrl: previewUrl,
							points,
							originPoint,
						}),
					);
					resolve({ points, originPoint });
				};
				img.src = e.target?.result as string;
			};
			reader.onerror = () => reject(new Error("Failed to read file"));

			reader.readAsDataURL(file);
		}).catch((error) => {
			let message = "Error processing image";
			console.error(error);
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue({ message: message });
		});
	},
);
