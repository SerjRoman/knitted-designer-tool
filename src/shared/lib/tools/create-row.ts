export function createRow(color: number, length: number) {
	return Array.from({ length }).map(() => color);
}
