function isPointOutOfGrid(point: Point, grid: Grid): boolean {
	return (
		point.y < 0 ||
		point.x < 0 ||
		point.y >= grid.length ||
		point.x >= grid[point.y].length
	);
}

import type { Grid, Point } from "../types";

export function getAdjacentPoints(startingPoint: Point, grid: Grid): Point[] {
	if (isPointOutOfGrid(startingPoint, grid)) {
		return [];
	}

	const targetColor = grid[startingPoint.y][startingPoint.x];
	const foundPoints: Point[] = [];
	const visited = new Set<string>();

	const queue: Point[] = [startingPoint];
	visited.add(`${startingPoint.y},${startingPoint.x}`);

	while (queue.length > 0) {
		const currentPoint = queue.shift()!;

		foundPoints.push(currentPoint);

		const neighbors = [
			{ y: currentPoint.y + 1, x: currentPoint.x },
			{ y: currentPoint.y - 1, x: currentPoint.x },
			{ y: currentPoint.y, x: currentPoint.x + 1 },
			{ y: currentPoint.y, x: currentPoint.x - 1 },
		];

		for (const neighbor of neighbors) {
			const neighborKey = `${neighbor.y},${neighbor.x}`;

			if (
				!isPointOutOfGrid(neighbor, grid) &&
				!visited.has(neighborKey) &&
				grid[neighbor.y][neighbor.x] === targetColor
			) {
				visited.add(neighborKey);
				queue.push(neighbor);
			}
		}
	}

	return foundPoints;
}
