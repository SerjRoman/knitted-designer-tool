import { Upload, Eye, Crop, Download } from "lucide-react";
import React from "react";
import { setGrid } from "@/entities/canvas";
import { useAppDispatch } from "@/shared/lib";

type RGBColor = { r: number; g: number; b: number };
type ColorMatrix = string[][];
function getResizedImageData(
	sourceImage: HTMLImageElement,
	targetWidth: number,
	targetHeight: number
): ImageData {
	const canvas = document.createElement("canvas");
	canvas.width = targetWidth;
	canvas.height = targetHeight;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Не удалось получить 2D контекст canvas");
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
	return ctx.getImageData(0, 0, targetWidth, targetHeight);
}
function rgbaToHexA(r: number, g: number, b: number, a: number): string {
	const componentToHex = (c: number) => c.toString(16).padStart(2, "0");
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
		b
	)}${componentToHex(a)}`;
}
function pixelDataToMatrix(imageData: ImageData): ColorMatrix {
	const { data, width, height } = imageData;
	const matrix: ColorMatrix = [];
	for (let y = 0; y < height; y++) {
		const row: string[] = [];
		for (let x = 0; x < width; x++) {
			const index = (y * width + x) * 4;
			row.push(
				rgbaToHexA(
					data[index],
					data[index + 1],
					data[index + 2],
					data[index + 3]
				)
			);
		}
		matrix.push(row);
	}
	return matrix;
}
function colorDistance(color1: RGBColor, color2: RGBColor): number {
	return (
		(color1.r - color2.r) ** 2 +
		(color1.g - color2.g) ** 2 +
		(color1.b - color2.b) ** 2
	);
}

/**
 * Находит разнообразные популярные цвета, избегая слишком похожих оттенков.
 * @param pixels - Массив всех пикселей.
 * @param count - Целевое количество цветов в палитре.
 * @returns {RGBColor[]} - Палитра из разнообразных популярных цветов.
 */
function getDiversePopularColors(
	pixels: RGBColor[],
	count: number
): RGBColor[] {
	// 1. Считаем частоту каждого цвета
	const colorCounts = new Map<string, { color: RGBColor; count: number }>();
	for (const pixel of pixels) {
		const key = `${pixel.r},${pixel.g},${pixel.b}`;
		if (!colorCounts.has(key)) {
			colorCounts.set(key, { color: pixel, count: 0 });
		}
		colorCounts.get(key)!.count++;
	}

	// 2. Сортируем все уникальные цвета по популярности
	const sortedColors = Array.from(colorCounts.values()).sort(
		(a, b) => b.count - a.count
	);

	const palette: RGBColor[] = [];
	const SIMILARITY_THRESHOLD = 3500;

	for (const popularColorItem of sortedColors) {
		const popularColor = popularColorItem.color;

		// Проверяем, не слишком ли этот цвет похож на те, что уже есть в палитре
		let isTooSimilar = false;
		for (const paletteColor of palette) {
			if (
				colorDistance(popularColor, paletteColor) < SIMILARITY_THRESHOLD
			) {
				isTooSimilar = true;
				break; // Нашли похожий, дальше проверять не нужно
			}
		}

		// Если цвет достаточно уникален, добавляем его в палитру
		if (!isTooSimilar) {
			palette.push(popularColor);
		}

		// Если набрали нужное количество цветов, останавливаемся
		if (palette.length >= count) {
			break;
		}
	}

	// Если даже после фильтрации цветов меньше, чем нужно (например, на черно-белой картинке),
	// просто дополним палитру самыми популярными, которые мы пропустили.
	// Это редкий случай, но он обезопасит от пустой палитры.
	let i = 0;
	while (palette.length < count && i < sortedColors.length) {
		const colorToAdd = sortedColors[i].color;
		const isInPalette = palette.some(
			(p) =>
				p.r === colorToAdd.r &&
				p.g === colorToAdd.g &&
				p.b === colorToAdd.b
		);
		if (!isInPalette) {
			palette.push(colorToAdd);
		}
		i++;
	}

	return palette;
}

// Функция quantizeImageSimple теперь должна вызывать getDiversePopularColors
function quantizeImageSimple(
	imageData: ImageData,
	maxColors: number
): ImageData {
	const { data, width, height } = imageData;
	const pixels: RGBColor[] = [];

	for (let i = 0; i < data.length; i += 4) {
		pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
	}

	// ИЗМЕНЕНИЕ ЗДЕСЬ: вызываем нашу новую умную функцию
	const palette = getDiversePopularColors(pixels, maxColors);

	// Остальная часть функции без изменений
	const colorMap = new Map<string, RGBColor>();
	const newData = new Uint8ClampedArray(data.length);
	for (let i = 0; i < pixels.length; i++) {
		const originalPixel = pixels[i];
		const key = `${originalPixel.r},${originalPixel.g},${originalPixel.b}`;

		let newColor: RGBColor;
		if (colorMap.has(key)) {
			newColor = colorMap.get(key)!;
		} else {
			let closestColor = palette[0] || { r: 0, g: 0, b: 0 }; // Безопасное значение по умолчанию
			let minDistance = Infinity;
			for (const paletteColor of palette) {
				const distance = colorDistance(originalPixel, paletteColor);
				if (distance < minDistance) {
					minDistance = distance;
					closestColor = paletteColor;
				}
			}
			newColor = closestColor;
			colorMap.set(key, newColor);
		}

		const index = i * 4;
		newData[index] = newColor.r;
		newData[index + 1] = newColor.g;
		newData[index + 2] = newColor.b;
		newData[index + 3] = data[index + 3];
	}

	return new ImageData(newData, width, height);
}
export function ActionButtons() {
	const dispatch = useAppDispatch();
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const TARGET_SIZE = 200;
				const MAX_COLORS = 12;
				const resizedImageData = getResizedImageData(
					img,
					TARGET_SIZE,
					TARGET_SIZE
				);
				const quantizedImageData = quantizeImageSimple(
					resizedImageData,
					MAX_COLORS
				);

				const colorMatrix = pixelDataToMatrix(quantizedImageData);
				console.log(colorMatrix);
				dispatch(setGrid(colorMatrix));
			};
			if (typeof e.target?.result === "string") {
				img.src = e.target.result;
			}
		};
		reader.readAsDataURL(file);
	};

	// JSX остается без изменений
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Actions
				</h3>
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 text-center mb-6 shadow-lg">
					<div className="text-sm opacity-90">Current Motif Size</div>
					<div className="text-2xl font-bold mt-1">48 × 48</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<button className="flex flex-col items-center gap-3 p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all">
						<Eye size={24} />
						<span className="font-semibold">Preview</span>
					</button>
					<button className="flex flex-col items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
						<Crop size={24} />
						<span className="font-semibold">Resize</span>
					</button>
					<button className="flex flex-col items-center gap-3 p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all">
						<Download size={24} />
						<span className="font-semibold">Save</span>
					</button>
					<label
						htmlFor="file-upload"
						className="flex flex-col items-center justify-center gap-3 p-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all cursor-pointer"
					>
						<Upload size={24} />
						<span className="font-semibold">Upload</span>
					</label>
					<input
						id="file-upload"
						type="file"
						className="hidden"
						accept="image/png, image/jpeg"
						onChange={handleFileChange}
					/>
				</div>
			</div>
		</div>
	);
}
