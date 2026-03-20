export type ModalType = "preview" | "reference" | null;

export interface DialogSchema {
	isOpen: boolean;
	variant: "success" | "error" | "info";
	title: string;
	message: string;
	details?: string | null;
}
