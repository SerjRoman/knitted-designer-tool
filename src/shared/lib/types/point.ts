export interface Point {
	x: number;
	y: number;
}
export interface PointWithCode extends Point {
	code: number;
}
export interface PointWithColor extends Point {
	color: string;
}
