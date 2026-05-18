export type PixelInApiImageBody = { code: number; count: number };

export type RowInApiImageBody = {
	index: number;
	pixels: PixelInApiImageBody[];
};
export type ApiImageBody = {
	width: number;
	height: number;
	colors: string[];
	symbols: string[];
	rows: RowInApiImageBody[];
};
