import type { Point } from "../types";

export const areTwoPointsEqual = (p1: Point, p2: Point) => {
	const result =  p1.x === p2.x && p1.y === p2.y;
    return result
};
