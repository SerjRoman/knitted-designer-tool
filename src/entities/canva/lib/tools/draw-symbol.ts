export function drawSymbol(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	symbolId: number,
) {
	context.strokeStyle = "rgba(0, 0, 0, 1)";
	context.lineWidth = 1;

	const centerX = x + width / 2;
	const centerY = y + height / 2;
	switch (symbolId) {
		case 1:
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			context.moveTo(x, y);
			context.lineTo(x + width, y + height);
			context.moveTo(x + width, y);
			context.lineTo(x, y + height);
			break;

		case 2:
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			break;

		case 3:
			context.moveTo(x, y + height);
			context.lineTo(x + width, y);
			break;

		case 4:
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			break;

		case 5:
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			break;

		case 6:
			context.moveTo(x, y);
			context.lineTo(x + width, y + height);
			context.moveTo(x + width, y);
			context.lineTo(x, y + height);
			break;
	}
}
