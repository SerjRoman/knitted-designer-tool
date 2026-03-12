import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DialogSchema, ModalType } from "./types";

interface UiState {
	activeModal: ModalType;
	dialog: DialogSchema;
}

const initialState: UiState = {
	activeModal: null,
	dialog: {
		isOpen: false,
		variant: "error",
		title: "",
		message: "",
		details: null,
	},
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	selectors: {
		selectActiveModal: (state) => state.activeModal,
		selectDialog: (state) => state.dialog,
	},
	reducers: {
		setActiveModal: (state, { payload }: PayloadAction<ModalType>) => {
			state.activeModal = payload;
		},
		toggleModal: (state, action: PayloadAction<ModalType>) => {
			state.activeModal =
				state.activeModal === action.payload ? null : action.payload;
		},
		closeAllModals: (state) => {
			state.activeModal = null;
		},
		openDialog: (
			state,
			action: PayloadAction<Omit<DialogSchema, "isOpen">>,
		) => {
			state.dialog = {
				isOpen: true,
				...action.payload,
			};
		},
		closeDialog: (state) => {
			state.dialog.isOpen = false;
			state.dialog.details = null;
			state.dialog.title = "";
			state.dialog.message = "";
		},
	},
});

export const {
	setActiveModal,
	toggleModal,
	closeAllModals,
	closeDialog,
	openDialog,
} = uiSlice.actions;
export const { selectActiveModal, selectDialog } = uiSlice.selectors;
