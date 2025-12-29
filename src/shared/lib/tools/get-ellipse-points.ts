import type { Point } from "../types";

function calculateEllipseParams(
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const width = maxX - minX;
    const height = maxY - minY;

    const rx = Math.floor(width / 2);
    const ry = Math.floor(height / 2);

    const xc = minX + rx;
    const yc = minY + ry;

    const shiftX = width % 2;
    const shiftY = height % 2;

    return { rx, ry, xc, yc, shiftX, shiftY };
}
export function getEllipsePoints(p1: Point, p2: Point) {
    const { rx, ry, xc, yc, shiftX, shiftY } = calculateEllipseParams(
        p1.x,
        p1.y,
        p2.x,
        p2.y
    );
    const points: Point[] = [];

    let x = 0;
    let y = ry;

    let d1 = ry * ry - rx * rx * ry + 0.25 * rx * rx;
    let dx = 2 * ry * ry * x;
    let dy = 2 * rx * rx * y;

    function fillRow(
        currentX: number,
        rowY: number,
        centerX: number,
        shiftX: number
    ) {
        const start = centerX - currentX;
        const end = centerX + currentX + shiftX;

        for (let i = start; i <= end; i++) {
            points.push({ x: i, y: rowY });
        }
    }

    while (dx < dy) {
        if (d1 < 0) {
            x++;
            dx += 2 * ry * ry;
            d1 += dx + ry * ry;
        } else {
            fillRow(x, yc - y, xc, shiftX);
            if (y !== 0 || shiftY === 1) {
                fillRow(x, yc + y + shiftY, xc, shiftX);
            }

            x++;
            y--;
            dx += 2 * ry * ry;
            dy -= 2 * rx * rx;
            d1 += dx - dy + ry * ry;
        }
    }

    let d2 =
        ry * ry * ((x + 0.5) * (x + 0.5)) +
        rx * rx * ((y - 1) * (y - 1)) -
        rx * rx * ry * ry;

    while (y >= 0) {
        fillRow(x, yc - y, xc, shiftX);
        if (y !== 0 || shiftY === 1) {
            fillRow(x, yc + y + shiftY, xc, shiftX);
        }

        if (d2 > 0) {
            y--;
            dy -= 2 * rx * rx;
            d2 += rx * rx - dy;
        } else {
            y--;
            x++;
            dx += 2 * ry * ry;
            dy -= 2 * rx * rx;
            d2 += dx - dy + rx * rx;
        }
    }

    return points;
}
