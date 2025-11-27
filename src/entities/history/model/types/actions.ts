import type { PointWithColor } from "@/shared/lib";

interface ChangeGridSizesSizes {
	numberOfColumns: number;
	numberOfRows: number;
}

export interface DrawActionPayload {
	pointsBefore: PointWithColor[];
	pointsAfter: PointWithColor[];
}

export interface ChangeGridSizesActionPayload {
	sizesBefore: ChangeGridSizesSizes;
	sizesAfter: ChangeGridSizesSizes;
	lostPixels: PointWithColor[];
}
export type EditColorActionPayload = {
	colorBefore: string;
	colorAfter: string;
};
export type AddColorActionPayload = {
	color: string;
};
export type ActionType =
	| "DRAW"
	| "CHANGE_GRID_SIZES"
	| "ADD_COLOR"
	| "EDIT_COLOR";

export type DrawAction = {
	payload: DrawActionPayload;
	type: "DRAW";
};
export type ChangeGridSizesAction = {
	payload: ChangeGridSizesActionPayload;
	type: "CHANGE_GRID_SIZES";
};
export type EditColorAction = {
	payload: EditColorActionPayload;
	type: "EDIT_COLOR";
};
export type AddColorAction = {
	payload: AddColorActionPayload;
	type: "ADD_COLOR";
};
export type ActionInput =
	| ChangeGridSizesAction
	| DrawAction
	| AddColorAction
	| EditColorAction;
export type Action = { id: string } & (
	| DrawAction
	| ChangeGridSizesAction
	| EditColorAction
	| AddColorAction
);
