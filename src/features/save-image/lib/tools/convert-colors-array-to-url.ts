export function convertColorsArrayToUrl(
	colorsArray: string[],
	width: number,
	height: number
): string {
	const colorRegex =
		/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

	const arrayColors: number[] = [];
	for (const color of colorsArray) {
		const match = color.match(colorRegex);

		if (match) {
			const r = parseInt(match[1], 10);
			const g = parseInt(match[2], 10);
			const b = parseInt(match[3], 10);

			let a = 255;
			if (match[4] !== undefined) {
				a = Math.round(parseFloat(match[4]) * 255);
			}

			arrayColors.push(r, g, b, a);
		} else {
			arrayColors.push(0, 0, 0, 255);
		}
	}
	const rgbData = new Uint8ClampedArray(arrayColors);

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Unable to create canvas from image");
	const imageData = new ImageData(rgbData, width, height);
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	ctx.putImageData(imageData, 0, 0);
	return canvas.toDataURL("image/png");
}
