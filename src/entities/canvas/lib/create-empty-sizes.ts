export function createEmtpySizes(count: number, size: number): number[] {
	return Array.from({ length: count }).map(() => size);
}
