export const createEmptyGrid = (
	width: number,
	height: number,
	backgroundColor: string
) => {
	return Array.from({ length: height }, () =>
		Array(width).fill(backgroundColor)
	);
};
