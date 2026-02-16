import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { Reference } from "../types/reference";

interface ReferenceState {
	references: Reference[];
}

const initialState: ReferenceState = {
	references: [],
};

export const referenceSlice = createSlice({
	name: "features/reference",
	initialState,
	selectors: {
		selectReferences: (state) => state.references,
	},
	reducers: {
		addReferenceImage: (
			state,
			{ payload }: PayloadAction<Omit<Reference, "id">>,
		) => {
			const ref: Reference = {
				id: nanoid(),
				...payload,
			};
			state.references.push(ref);
		},
		removeReferenceImage: (
			state,
			{ payload }: PayloadAction<{ id: string }>,
		) => {
			const newReferences = state.references.filter(
				(ref) => ref.id !== payload.id,
			);
			state.references = newReferences;
		},

		clearReferences: (state) => {
			state.references = [];
		},
	},
});
export const { addReferenceImage, removeReferenceImage, clearReferences } =
	referenceSlice.actions;
export const { selectReferences } = referenceSlice.selectors;
