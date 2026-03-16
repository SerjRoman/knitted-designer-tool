import { ApiClient } from "@/shared/api";
import { transformGridToApiFormat, type Grid } from "@/shared/lib";

export interface CreateProductPayload {
	title: string;
	description: string;
	tags: string;
	isPublic: number;
	token: string;
}

export interface AttachImagePayload {
	imgId: number;
	token: string;
}

export interface SaveImageToCloudPayload {
	filename: string;
	colors: string[];
	grid: Grid;
	numberOfColumns: number;
	numberOfRows: number;
}

export interface UpdateProductPayload {
	productId: number;
	title: string;
	description: string;
	tags: string;
	isPublic: number;
	token: string;
}

class SaveImageError extends Error {
	public statusCode: number | null = null;
	constructor(statusCode: number | null, message: string) {
		super(message);
		this.name = "SaveImageError";
		this.statusCode = statusCode;
	}
}

const handleResponse = async (response: Response, operationName: string) => {
	if (!response.ok) {
		console.error(`Failed to ${operationName}:`, response.statusText);

		switch (response.status) {
			case 404:
				throw new SaveImageError(404, "Not found");
			case 500:
				throw new SaveImageError(500, "Internal Server Error");
			default:
				throw new SaveImageError(
					response.status,
					"Unknown server error. Please try again later!",
				);
		}
	}
};

export const saveImageQueries = {
	createProduct: async (
		url: string,
		payload: CreateProductPayload,
	): Promise<{ productId: number }> => {
		try {
			const { response, data } = await ApiClient.Post<{
				productId: number;
			}>(url, payload, { credentials: "include" });

			await handleResponse(response, "create product");
			return data;
		} catch (error) {
			console.error("Create product error:", error);
			if (error instanceof SaveImageError) {
				throw error;
			}
			throw new SaveImageError(
				null,
				"Network error. Please try again later!",
			);
		}
	},

	attachImage: async (
		url: string,
		payload: AttachImagePayload,
	): Promise<{ imageId: number }> => {
		try {
			const { response, data } = await ApiClient.Post<{
				imageId: number;
			}>(url, payload, {
				credentials: "include",
			});

			await handleResponse(response, "attach image");
			return data;
		} catch (error) {
			console.error("Attach image error:", error);
			if (error instanceof SaveImageError) {
				throw error;
			}
			throw new SaveImageError(
				null,
				"Network error. Please try again later!",
			);
		}
	},

	updateProduct: async (
		url: string,
		payload: UpdateProductPayload,
	): Promise<void> => {
		try {
			const { response } = await ApiClient.Patch(url, payload);

			await handleResponse(response, "update product");
		} catch (error) {
			console.error("Update product error:", error);
			if (error instanceof SaveImageError) {
				throw error;
			}
			throw new SaveImageError(
				null,
				"Network error. Please try again later!",
			);
		}
	},

	saveImageToCloud: async (
		payload: SaveImageToCloudPayload,
	): Promise<void> => {
		try {
			const { colors, grid, numberOfColumns, numberOfRows, filename } =
				payload;

			const dataToSend = transformGridToApiFormat(
				grid,
				colors,
				numberOfColumns,
				numberOfRows,
			);

			const { response } = await ApiClient.Post(
				"https://assets.knittedforyou.com/save-json",
				{ filename: filename + ".json", content: dataToSend },
			);

			await handleResponse(response, "save image to cloud");
		} catch (error) {
			console.error("Save image to cloud error:", error);
			if (error instanceof SaveImageError) {
				throw error;
			}
			throw new SaveImageError(
				null,
				"Network error. Please try again later!",
			);
		}
	},
};
