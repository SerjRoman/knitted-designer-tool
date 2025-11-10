export type PixelInUploadedImage = { color: number; count: number };

export type RowInUploadedImage = {
	index: number;
	pixels: PixelInUploadedImage[];
};
export type UploadedImage = {
	width: number;
	height: number;
	colors: string[];
	rows: RowInUploadedImage[];
};
