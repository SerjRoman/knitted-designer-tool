import type { Point, PointWithColor } from "@/shared/lib";

export interface Reference {
	id: string;
	imageUrl: string;
	points: PointWithColor[];
	originPoint: Point;
}
