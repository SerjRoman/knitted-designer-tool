import { useState } from "react";
import { ApiClient } from "@/shared/api";
import { setProductId, useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { saveImageToCloud } from "../model";

export function SaveImageModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const { product } = useAppSelector((state) => state.product);
	const [productName, setProductName] = useState(product?.name || "");
	const [productDescription, setProductDescription] = useState(
		product?.description || "",
	);
	const [tags, setTags] = useState<string[]>(product?.tags || []);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { token, createUrl, attachUrl } = useAppSelector(
		(state) => state.config,
	);
	async function onSave() {
		try {
			if (!token) {
				console.warn("No token provided in URL");
				return;
			}
			if (!createUrl || !attachUrl) {
				console.warn("API URLs not provided in config");
				return;
			}
			const tagsCsv = Array.isArray(tags) ? tags.join(",") : tags;
			if (product.id === 0 || product.id === null) {
				const { response: createResponse, data: createData } =
					await ApiClient.Post<{ productId: number }>(
						createUrl,
						{
							title: productName,
							description: productDescription,
							tags: tagsCsv,
							isPublic: isPublic,
							token,
						},
						{ credentials: "include" },
					);
				if (!createResponse.ok) {
					console.error("Failed to create motif:", createResponse);
					return;
				}
				console.log("Save response:", createData);
				dispatch(setProductId(createData.productId));
				await dispatch(
					saveImageToCloud({
						filename: String(createData.productId),
					}),
				).unwrap();
				const { response: attachImageResponse } = await ApiClient.Post(
					attachUrl,
					{
						imgId: createData.productId,
						token,
					},
					{ credentials: "include" },
				);
				if (!attachImageResponse.ok) {
					console.error(
						"Failed to attach image:",
						attachImageResponse,
					);
				}
				console.log("Image attached successfully");
				onClose();
			} else {
				// const saveRes = await ApiClient.Post(saveUrl, {
				// 	productId,
				// 	token,
				// });
				// const saveData = await saveRes.json();
				console.log("Save response:");
			}
		} catch (error) {
			console.error("Error saving motif:", error);
		}
	}
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
					<button
						type="button"
						className="border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 hover:bg-gray-50"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						type="button"
						className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
						onClick={onSave}
					>
						Save
					</button>
				</div>
			</div>
		</Modal>
	);
}
