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
		case 1: // star "*"
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			context.moveTo(x, y);
			context.lineTo(x + width, y + height);
			context.moveTo(x + width, y);
			context.lineTo(x, y + height);
			break;

		case 2: // vLine "│"
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			break;

		case 3: // slash "/"
			context.moveTo(x, y + height);
			context.lineTo(x + width, y);
			break;

		case 4: // hLine "─"
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			break;

		case 5: // plus "+"
			context.moveTo(centerX, y);
			context.lineTo(centerX, y + height);
			context.moveTo(x, centerY);
			context.lineTo(x + width, centerY);
			break;

		case 6: // minus "-"
			context.moveTo(x + width * 0.25, centerY);
			context.lineTo(x + width * 0.75, centerY);
			break;

		case 7: // x "x"
			context.moveTo(x, y);
			context.lineTo(x + width, y + height);
			context.moveTo(x + width, y);
			context.lineTo(x, y + height);
			break;
	}
}
