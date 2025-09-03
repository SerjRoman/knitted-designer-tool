export function createRow(color: string, length: number) {
	return Array.from({ length }).map(() => color);
}
