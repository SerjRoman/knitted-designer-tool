import type { Point, PointWithColor } from "@/shared/lib";

export function drawClipboardPreview(
    context: CanvasRenderingContext2D,
    clipboardPoints: PointWithColor[],
    origin: Point,
    pixelSize: number,
    numberOfColumns: number,
    numberOfRows: number
) {
    context.globalAlpha = 0.75;
    for (const point of clipboardPoints) {
        const worldX = point.x + origin.x;
        const worldY = point.y + origin.y;

        if (
            worldX >= numberOfColumns ||
            worldY >= numberOfRows ||
            worldX < 0 ||
            worldY < 0
        ) {
            continue;
        }

        context.fillStyle = point.color;
        const rectX = worldX * pixelSize;
        const rectY = worldY * pixelSize;

        context.fillRect(rectX, rectY, pixelSize, pixelSize);
    }

    context.globalAlpha = 1.0;
}
