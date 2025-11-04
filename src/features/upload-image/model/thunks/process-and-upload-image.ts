// src/features/upload-image/model/thunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setColors } from "@/entities/canvas";
import {
	setClipboardPoints,
	setClipboardOrigin,
	selectTool,
} from "@/entities/editor";
import {
	getBoundingBox,
	getImageDataFromImage,
	getPopularColorsFromRGBArray,
	MAX_COLORS,
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
	async ({ file, width, height }, { dispatch }) => {
		function onError() {
			new Error("Failed to read file as string.");
		}
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const resizedImageData = getImageDataFromImage({
					source: img,
					width,
					height,
				});
				const RGBArray = convertImageDataToRGBArray(resizedImageData);
				const colors = getPopularColorsFromRGBArray(
					RGBArray,
					MAX_COLORS
				);
				const stringifiedColors = colors.map(
					(color) => `rgb(${color.r}, ${color.g}, ${color.b})`
				);
				const quantizedRGBArray = quantizeRGBArrayByPalette(
					RGBArray,
					colors
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
