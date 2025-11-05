import { createAsyncThunk } from "@reduxjs/toolkit";
import { setColors } from "@/entities/canvas";
import {
	setClipboardPoints,
	setClipboardOrigin,
	selectTool,
} from "@/entities/editor";
import {
	approximateColors,
	getBoundingBox,
	getImageDataFromImage,
	getPopularColorsFromRGBArray,
	MAX_COLORS,
	type AppStateSchema,
	type RGBColor,
} from "@/shared/lib";
import {
	convertImageDataToRGBArray,
	createPointsFromImage,
	quantizeRGBArrayByPalette,
} from "../../lib";

interface ProcessImagePayload {
	file: File;
	width: number;
	height: number;
}

export const processAndUploadImage = createAsyncThunk<
	void,
	ProcessImagePayload
>(
	"features/uploadImage/process",
	async ({ file, width, height }, { dispatch, getState }) => {
		function onError() {
			new Error("Failed to read file as string.");
		}
		const reader = new FileReader();
		const {
			canvas: { grid },
		} = getState() as AppStateSchema;
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const resizedImageData = getImageDataFromImage({
					source: img,
					width,
					height,
				});
				const RGBArray = convertImageDataToRGBArray(resizedImageData);
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
					MAX_COLORS
				);
				const finalColors = approximateColors(
					usedColors,
					popularColors
				);
				console.log(finalColors);
				const stringifiedColors = finalColors.map(
					(color) => `rgb(${color.r}, ${color.g}, ${color.b})`
				);
				const quantizedRGBArray = quantizeRGBArrayByPalette(
					RGBArray,
					finalColors
				);
				const points = createPointsFromImage(
					quantizedRGBArray,
					width,
					height
				);

				const { maxX, maxY, minX, minY } = getBoundingBox(points);
				const centerX = Math.floor((minX + maxX) / 2);
				const centerY = Math.floor((minY + maxY) / 2);
				const originPoint = { x: centerX, y: centerY };

				dispatch(setClipboardPoints(points));
				dispatch(setClipboardOrigin(originPoint));
				dispatch(selectTool("paste"));
				dispatch(setColors(stringifiedColors));
			};
			img.onerror = onError;
			if (typeof e.target?.result === "string") {
				img.src = e.target.result;
			} else {
				onError();
			}
		};
		reader.onerror = onError;
		reader.readAsDataURL(file);
	}
);
