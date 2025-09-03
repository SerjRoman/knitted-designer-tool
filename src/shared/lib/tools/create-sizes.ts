export function createSizesFrom(count: number, size: number): number[] {
	return Array.from({ length: count }).map(() => size);
}
