import {
	addColor,
	selectBackgroundColor,
	selectColors,
	setBackgroundColorId,
	setColors,
} from "@/entities/canva";
import {
	approximateColors,
	getBoundingBox,
	getImageDataFromImage,
	getPopularColorsFromRGBArray,
	MAX_COLORS,
	type Point,
	type PointWithCode,
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
	replacePalette: boolean;
}

function parseRGBColor(color: string): RGBColor {
	const channels = color.match(/\d+/g)?.map(Number);
	if (!channels || channels.length < 3) {
		throw new Error(`Invalid RGB color: ${color}`);
	}

	return {
		r: channels[0],
		g: channels[1],
		b: channels[2],
	};
}

function formatRGBColor(color: RGBColor): string {
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function getRGBKey(color: RGBColor): string {
	return `${color.r},${color.g},${color.b}`;
}

export const processAndUploadImage = createAppAsyncThunk<
	{ points: PointWithCode[]; originPoint: Point },
	ProcessImagePayload
>(
	"features/uploadImage/process",
	async (
		{ file, width, height, replacePalette },
		{ dispatch, getState, rejectWithValue },
	) => {
		return await new Promise<{
			points: PointWithCode[];
			originPoint: Point;
		}>((resolve, reject) => {
			const reader = new FileReader();
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
					const existingColors = selectColors(getState());
					const backgroundColor = selectBackgroundColor(getState());
					const backgroundRGBColor = parseRGBColor(backgroundColor);
					const usedColors: RGBColor[] = replacePalette
						? [backgroundRGBColor]
						: existingColors
								.slice(0, MAX_COLORS)
								.map(parseRGBColor);
					const popularColors = getPopularColorsFromRGBArray(
						RGBArray,
						MAX_COLORS,
					);
					const finalColors = approximateColors(
						usedColors,
						popularColors,
					).slice(0, MAX_COLORS);

					const colorIdByRGBKey = new Map<string, number>();
					if (replacePalette) {
						finalColors.forEach((color, colorId) => {
							colorIdByRGBKey.set(getRGBKey(color), colorId);
						});
						dispatch(setBackgroundColorId(0));
						dispatch(setColors(finalColors.map(formatRGBColor)));
					} else {
						const colorIdByExistingKey = new Map<string, number>();
						existingColors.forEach((color, colorId) => {
							colorIdByExistingKey.set(
								getRGBKey(parseRGBColor(color)),
								colorId,
							);
						});

						let nextColorId = existingColors.length;
						for (const color of finalColors) {
							const rgbKey = getRGBKey(color);
							const colorString = formatRGBColor(color);
							let colorId = colorIdByExistingKey.get(rgbKey);

							if (colorId === undefined) {
								colorId = nextColorId;
								nextColorId++;
								colorIdByExistingKey.set(rgbKey, colorId);
								dispatch(addColor(colorString));
							}

							colorIdByRGBKey.set(rgbKey, colorId);
						}
					}

					const quantizedRGBArray = quantizeRGBArrayByPalette(
						RGBArray,
						finalColors,
					);
					const points = createPointsFromImage(
						quantizedRGBArray,
						width,
						height,
						colorIdByRGBKey,
					);

					const { maxX, maxY, minX, minY } = getBoundingBox(points);
					const centerX = Math.floor((minX + maxX) / 2);
					const centerY = Math.floor((minY + maxY) / 2);
					const originPoint = { x: centerX, y: centerY };

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
