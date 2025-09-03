export const buildOffsets = (sizes: number[]) => {
	const arr: number[] = [];
	let accum = 0;
	sizes.forEach((elem) => {
		arr.push(accum);
		accum += elem;
	});
	return arr;
};
