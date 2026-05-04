import type { Point, PointWithCode } from "@/shared/lib";

export interface Reference {
	id: string;
	imageUrl: string;
	points: PointWithCode[];
	originPoint: Point;
}
