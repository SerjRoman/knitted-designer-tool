import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { openDialog } from "@/entities/modal";
import { setProduct, useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { saveImageQueries } from "../api/save-image-queries";

export function SaveImageModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const dispatch = useAppDispatch();
	const { product } = useAppSelector((state) => state.product);
	const canvas = useAppSelector((state) => state.canvas);
	const [productName, setProductName] = useState(product?.name || "");
	const [productDescription, setProductDescription] = useState(
		product?.description || "",
	);
	const [tags, setTags] = useState<string[]>(product?.tags || []);
	const [isPublic, setIsPublic] = useState<boolean>(
		product.isPublic || false,
	);
	const { token, createUrl, attachUrl, updateUrl } = useAppSelector(
		(state) => state.config,
	);
	const getStatusMessage = (): string => {
		if (createProductMutation.isPending) {
			return "Creating product...";
		}
		if (saveImageToCloudMutation.isPending) {
			return "Saving image to cloud...";
		}
		if (attachImageMutation.isPending) {
			return "Attaching image...";
		}
		if (updateProductMutation.isPending) {
			return "Updating product...";
		}
		return "";
	};

	const createProductMutation = useMutation({
		mutationFn: ({ token }: { token: string }) =>
			saveImageQueries.createProduct(createUrl!, {
				title: productName,
				description: productDescription,
				tags: Array.isArray(tags) ? tags.join(",") : tags,
				isPublic: isPublic ? 1 : 0,
				token,
			}),
	});

	const saveImageToCloudMutation = useMutation({
		mutationFn: (filename: string) =>
			saveImageQueries.saveImageToCloud({
				filename,
				colors: canvas.colors,
				grid: canvas.grid,
				numberOfColumns: canvas.numberOfColumns,
				numberOfRows: canvas.numberOfRows,
			}),
	});

	const attachImageMutation = useMutation({
		mutationFn: ({
			productId,
			token,
		}: {
			productId: number;
			token: string;
		}) =>
			saveImageQueries.attachImage(attachUrl!, {
				imgId: productId,
				token,
			}),
	});

	const updateProductMutation = useMutation({
		mutationFn: ({
			productId,
			token,
		}: {
			productId: number;
			token: string;
		}) =>
			saveImageQueries.updateProduct(updateUrl!, {
				productId,
				title: productName,
				description: productDescription,
				tags: Array.isArray(tags) ? tags.join(",") : tags,
				isPublic: isPublic ? 1 : 0,
				token,
			}),
	});

	async function onSave() {
		if (!token || !createUrl || !attachUrl || !updateUrl) {
			console.warn("Missing required configuration");
			openDialog({
				variant: "error",
				title: "Configuration error",
				message:
					"Required configuration is missing. Please update page.",
			});
			return;
		}

		try {
			let createData: { productId: number } | null = null;
			if (product.id === 0 || product.id === null) {
				createData = await createProductMutation.mutateAsync({ token });
				await saveImageToCloudMutation.mutateAsync(
					String(createData.productId),
				);
				await attachImageMutation.mutateAsync({
					productId: createData.productId,
					token,
				});
			} else {
				await updateProductMutation.mutateAsync({
					productId: product.id,
					token,
				});
				await saveImageToCloudMutation.mutateAsync(String(product.imageId));
			}
			const productId = createData?.productId || product.id || 0;
			dispatch(
				setProduct({
					id: productId,
					name: productName,
					description: productDescription,
					tags: tags,
					isPublic: isPublic,
					imageId: product.imageId
						? product.imageId
						: createProductMutation.data?.productId || null,
				}),
			);
			const params = new URLSearchParams(globalThis.location.search);
			if (productId === null) {
				params.delete("productId");
			} else {
				params.set("productId", String(productId));
			}

			const newUrl = `${globalThis.location.pathname}?${params.toString()}`;
			globalThis.history.pushState({}, "", newUrl);

			onClose();
			dispatch(
				openDialog({
					variant: "success",
					title: "Saving successful.",
					message: "Your image has been successfully saved.",
				}),
			);
		} catch (error) {
			console.error("Error saving motif:", error);
			onClose();
			dispatch(
				openDialog({
					variant: "error",
					title: "Saving failed.",
					message: "An error occurred while saving your image.",
				}),
			);
		}
	}

	const isLoading =
		createProductMutation.isPending ||
		saveImageToCloudMutation.isPending ||
		attachImageMutation.isPending ||
		updateProductMutation.isPending;
	const statusMessage = getStatusMessage();

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="flex items-center justify-center z-[100]"
		>
			<div className="bg-white p-6 rounded-lg shadow-xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto w-96">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Save Motif
					</h2>
				</div>

				<div className="flex flex-col gap-4">
					<input
						type="text"
						placeholder="Enter product name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
					<input
						type="text"
						placeholder="Enter product description"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
					<input
						type="text"
						placeholder="Enter tags (comma separated)"
						value={tags.join(",")}
						onChange={(e) =>
							setTags(
								e.target.value
									.split(",")
									.map((tag) => tag.trim()),
							)
						}
						className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={isPublic}
							onChange={(e) => setIsPublic(e.target.checked)}
							className="accent-blue-500"
						/>
						<span className="text-gray-700">Is public</span>
					</label>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					{statusMessage && (
						<div className="text-sm text-blue-600 font-medium animate-pulse">
							{statusMessage}
						</div>
					)}
					<button
						type="button"
						className="border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</button>
					<button
						type="button"
						className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
						onClick={onSave}
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</Modal>
	);
}
