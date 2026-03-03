import { useState } from "react";
import { Modal } from "@/shared/ui";

export function SaveImageModal({
	isOpen,
	onClose,
	token,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
	token: string;
}>) {
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	async function onSave() {
		try {
			const res = await fetch(
				"http://dev.knittedforyou.com/module/motifdesigner/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						productName,
						productDescription,
						token,
					}),
				},
			);
			const data = await res.json();
			console.log("Save response:", data);
		} catch (error) {
			console.error("Error saving motif:", error);
		}
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<input
				type="text"
				placeholder="Enter product name"
				value={productName}
				onChange={(e) => setProductName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Enter product description"
				value={productDescription}
				onChange={(e) => setProductDescription(e.target.value)}
			/>

			<button onClick={onSave}>Save</button>
		</Modal>
	);
}
