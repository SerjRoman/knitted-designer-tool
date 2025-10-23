import type { RGBColor } from "@/shared/lib";

export function convertImageDataToRGBArray({ data }: ImageData): RGBColor[] {
	const RGBArray: RGBColor[] = [];
	for (let i = 0; i < data.length; i += 4) {
		const color: RGBColor = {
			r: data[i],
			g: data[i + 1],
			b: data[i + 2],
		};
		RGBArray.push(color);
	}
	return RGBArray;
}
