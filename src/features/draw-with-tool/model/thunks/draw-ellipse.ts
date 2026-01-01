import { setPixels } from "@/entities/canvas";
import { clearShapeState } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import {
	getEllipsePoints,
	type Point,
	type PointWithColor,
} from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const drawEllipse = createAppAsyncThunk(
	"canvas/draw-ellipse",
	(endPoint: Point, { getState, dispatch }) => {
		const {
			editor: { currentColor, toolState },
		} = getState();
		const {
			canvas: { grid },
		} = getState();
		if (
			toolState.tool !== "shape" ||
			toolState.shape !== "ellipse" ||
			!toolState.startPoint
		)
			return;
		const pointsToFill = getEllipsePoints(toolState.startPoint, endPoint);

		const pointsBefore: PointWithColor[] = [];
		const pointsAfter: PointWithColor[] = [];
		pointsToFill.forEach((point) => {
			const oldColor = grid[point.y][point.x];
			pointsBefore.push({ ...point, color: oldColor });
			pointsAfter.push({ ...point, color: currentColor });
		});

		dispatch(setPixels({ points: pointsToFill, color: currentColor }));
		dispatch(clearShapeState());

		dispatch(
			addActionToHistory({
				type: "DRAW",
				payload: {
					pointsBefore,
					pointsAfter,
				},
			})
		);
	}
);
