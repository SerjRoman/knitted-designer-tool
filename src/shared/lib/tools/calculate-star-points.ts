// import type { Point } from "../types";
// import { getLinePoints } from "./get-line-pixels";

// function calculateStarParams(p1: Point, p2: Point) {
// 	const minX = Math.min(p1.x, p2.x);
// 	const maxX = Math.max(p1.x, p2.x);
// 	const minY = Math.min(p1.y, p2.y);
// 	const maxY = Math.max(p1.y, p2.y);

// 	const width = maxX - minX;
// 	const height = maxY - minY;
// 	const radius = {
// 		x: Math.floor(width / 2),
// 		y: Math.floor(height / 2),
// 	};
// 	const center = {
// 		x: minX + radius.x,
// 		y: minY + radius.y,
// 	};

// 	const shift = {
// 		x: width % 2,
// 		y: height % 2,
// 	};
// 	return { radius, shift, center };
// }

// export function calculateStarPoints(p1: Point, p2: Point) {
// 	const { radius, shift, center } = calculateStarParams(p1, p2);
// 	const points: Point[] = [];

// 	function calculateTrianglePoints(
// 		centerPoint: Point,
// 		sidePoint: Point,
// 		topPoint: Point,
// 	) {
// 		const points: Point[] = [];
// 		const hypotenuse = getLinePoints(topPoint, sidePoint);
// 		const hMap = new Map<number, number>();
// 		hypotenuse.forEach((p) => {
// 			const radius = Math.abs(p.x - centerPoint.x);
// 			const currentMax = hMap.get(p.y) || 0;
// 			hMap.set(p.y, Math.max(currentMax, radius));
// 		});
// 		hMap.forEach((radius, y) => {
// 			for (let i = center.x - radius; i < centerPoint.x + radius; i++) {
// 				points.push({
// 					x: i,
// 					y: y,
// 				});
// 			}
// 		});
// 		return [...hypotenuse, ...points];
// 	}
// 	for (let i = 0; i < 5; i++) {
// 		const angle = (i * Math.PI * 2) / 5;
// 		const top = {
// 			x: center.x + radius.x * Math.cos(angle),
// 			y: center.y + radius.y * Math.sin(angle),
// 		};
// 		const side = {
// 			x: Math.round(center.x + radius.x * Math.cos(angle + Math.PI / 2)),
// 			y: Math.round(center.y + radius.y * Math.sin(angle + Math.PI / 2)),
// 		};
// 		points.push(...calculateTrianglePoints(center, side, top));
// 	}
// 	return points;
// }

// console.log(calculateStarPoints({ x: 10, y: 10 }, { x: 20, y: 20 }));
