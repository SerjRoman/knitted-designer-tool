import type { StitchSymbol } from "@/entities/canva";
import type { PointWithCode } from "@/shared/lib";

interface ChangeGridSizesData {
	numberOfColumns: number;
	numberOfRows: number;
}

export interface DrawActionPayload {
	pointsBefore: PointWithCode[];
	pointsAfter: PointWithCode[];
}

export interface ChangeGridSizesActionPayload {
	sizesBefore: ChangeGridSizesData;
	sizesAfter: ChangeGridSizesData;
	lostPixels: PointWithCode[];
}
export interface ChangePixelDimensionsActionPayload {
	pixelWidthBefore: number;
	pixelWidthAfter: number;
	pixelHeightBefore: number;
	pixelHeightAfter: number;
}
export type EditColorActionPayload = {
	colorBefore: string;
	colorAfter: string;
};
export type EditSymbolActionPayload = {
	symbolBefore: StitchSymbol;
	symbolAfter: StitchSymbol;
};

export interface MergeColorActionPayload {
	colorToMerge: string;
	newColor: string;
	pixelsBefore: PointWithCode[];
	pixelsAfter: PointWithCode[];
	colorsBefore: string[];
	colorsAfter: string[];
}
export interface MergeSymbolActionPayload {
	symbolToMerge: StitchSymbol;
	newSymbol: StitchSymbol;
	pixelsBefore: PointWithCode[];
	pixelsAfter: PointWithCode[];
	symbolsBefore: StitchSymbol[];
	symbolsAfter: StitchSymbol[];
}
export type AddColorActionPayload = {
	color: string;
};
export type AddSymbolActionPayload = {
	symbol: StitchSymbol;
};
export type ActionType =
	| "DRAW"
	| "CHANGE_GRID_DIMENSIONS"
	| "CHANGE_PIXEL_DIMENSIONS"
	| "ADD_COLOR"
	| "EDIT_COLOR"
	| "MERGE_COLOR"
	| "ADD_SYMBOL"
	| "MERGE_SYMBOL";

export type DrawAction = {
	payload: DrawActionPayload;
	type: "DRAW";
};
export type ChangeGridSizesAction = {
	payload: ChangeGridSizesActionPayload;
	type: "CHANGE_GRID_DIMENSIONS";
};
export type ChangePixelDimensionsAction = {
	payload: ChangePixelDimensionsActionPayload;
	type: "CHANGE_PIXEL_DIMENSIONS";
};
export type EditColorAction = {
	payload: EditColorActionPayload;
	type: "EDIT_COLOR";
};
export type EditSymbolAction = {
	payload: EditSymbolActionPayload;
	type: "EDIT_SYMBOL";
};
export type AddColorAction = {
	payload: AddColorActionPayload;
	type: "ADD_COLOR";
};
export type AddSymbolAction = {
	payload: AddSymbolActionPayload;
	type: "ADD_SYMBOL";
};
export type MergeColorAction = {
	payload: MergeColorActionPayload;
	type: "MERGE_COLOR";
};
export type MergeSymbolAction = {
	payload: MergeSymbolActionPayload;
	type: "MERGE_SYMBOL";
};
export type ActionInput =
	| ChangeGridSizesAction
	| DrawAction
	| AddColorAction
	| EditColorAction
	| ChangePixelDimensionsAction
	| MergeColorAction
	| AddSymbolAction
	| MergeSymbolAction
	| EditSymbolAction;
export type Action = { id: string } & ActionInput;
