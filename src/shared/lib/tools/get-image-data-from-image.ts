interface GetMatrixByImageParams {
	source: HTMLImageElement;
	width: number;
	height: number;
}

export function getImageDataFromImage({
	source,
	width,
	height,
}: GetMatrixByImageParams): ImageData {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Unable to get 2D context of canvas");
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(source, 0, 0, width, height);
	return ctx.getImageData(0, 0, width, height);
}
