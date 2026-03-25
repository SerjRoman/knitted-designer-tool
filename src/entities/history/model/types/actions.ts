import type { PointWithColor } from "@/shared/lib";

interface ChangeGridSizesData {
    numberOfColumns: number;
    numberOfRows: number;
}

export interface DrawActionPayload {
    pointsBefore: PointWithColor[];
    pointsAfter: PointWithColor[];
}

export interface ChangeGridSizesActionPayload {
    sizesBefore: ChangeGridSizesData;
    sizesAfter: ChangeGridSizesData;
    lostPixels: PointWithColor[];
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

export interface MergeColorActionPayload {
    colorToMerge: string;
    newColor: string;
    pixelsBefore: PointWithColor[];
    pixelsAfter: PointWithColor[];
}
export type AddColorActionPayload = {
    color: string;
};
export type ActionType =
    | "DRAW"
    | "CHANGE_GRID_DIMENSIONS"
    | "CHANGE_PIXEL_DIMENSIONS"
    | "ADD_COLOR"
    | "EDIT_COLOR"
    | "MERGE_COLOR";

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
export type AddColorAction = {
    payload: AddColorActionPayload;
    type: "ADD_COLOR";
};
export type MergeColorAction = {
    payload: MergeColorActionPayload;
    type: "MERGE_COLOR";
};
export type ActionInput =
    | ChangeGridSizesAction
    | DrawAction
    | AddColorAction
    | EditColorAction
    | ChangePixelDimensionsAction
    | MergeColorAction;
export type Action = { id: string } & ActionInput;
