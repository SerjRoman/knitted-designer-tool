export function calculateTension(
	stitches: number,
	rows: number,
	cm: number = 10
) {
	return {
		width: cm / stitches,
		height: cm / rows,
	};
}
