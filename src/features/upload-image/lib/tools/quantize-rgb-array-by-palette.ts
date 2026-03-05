import { calculateColorDistance, type RGBColor } from "@/shared/lib";

export function quantizeRGBArrayByPalette(
	RGBArray: RGBColor[],
	palette: RGBColor[]
): RGBColor[] {
	const newRGBArray: RGBColor[] = [...RGBArray];
	const colorMap = new Map<string, RGBColor>();
	for (let i = 0; i < newRGBArray.length; i++) {
		const originalColor = newRGBArray[i];
		const key = `${originalColor.r},${originalColor.g},${originalColor.b}`;
		let newColor: RGBColor;
		if (colorMap.has(key)) {
			newColor = colorMap.get(key)!;
		} else {
			let closestColor = palette[0] || { r: 0, g: 0, b: 0 };
			let minDistance = Infinity;
			for (const paletteColor of palette) {
				const distance = calculateColorDistance(
					originalColor,
					paletteColor
				);
				if (distance < minDistance) {
					minDistance = distance;
					closestColor = paletteColor;
				}
			}
			newColor = closestColor;
			colorMap.set(key, newColor);
			newRGBArray[i] = newColor;
		}
	}
	return newRGBArray;
}
