import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { updateGridSizes, setColors, setGrid } from "@/entities/canvas";
import { setCurrentColor } from "@/entities/editor";
import { ApiClient } from "@/shared/api";
import { HEXToRGB, type Grid, type ApiImageBody } from "@/shared/lib";

export const uploadImageFromCloud = createAsyncThunk(
    "features/upload-image-from-cloud",
    async (filename: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await ApiClient.Get<ApiImageBody>(
                `https://assets.knittedforyou.com/motif/${filename}.json`
            );
            const { width, height, colors, rows } = response.data;
            const RGBColors = colors.map(HEXToRGB);
            dispatch(
                updateGridSizes({
                    numberOfColumns: width,
                    numberOfRows: height,
                })
            );
            const grid: Grid = Array.from<[]>({ length: height }).fill([]);
            for (const row of rows) {
                const transformedRow = row.pixels
                    .map((pixel) => {
                        const array = Array.from<string>({
                            length: pixel.count,
                        }).fill(RGBColors[pixel.color]);
                        return array;
                    })
                    .reduce(
                        (prevValue, currentValue) => [
                            ...prevValue,
                            ...currentValue,
                        ],
                        []
                    );
                grid[row.index] = transformedRow;
            }
            dispatch(setColors(RGBColors));
            dispatch(setCurrentColor(RGBColors[0]));
            dispatch(setGrid(grid));
            dispatch(
                updateGridSizes({
                    numberOfColumns: width,
                    numberOfRows: height,
                })
            );
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.status === 500) {
                    return rejectWithValue(
                        "Server error. Please try again later!"
                    );
                }
                if (error.status === 404) {
                    return rejectWithValue({
                        message:
                            "Motif not found. Please check that the motif exists!",
                    });
                }
            }
            return rejectWithValue({
                message: "Unhandled error. Please try again!",
            });
        }
    }
);
