import { Download } from "lucide-react";
import { useState } from "react";
import { ToolButton } from "@/entities/editor";
import { openDialog } from "@/entities/ui";
import { ENV } from "@/shared/config";
import { useAppDispatch } from "@/shared/store";
import { saveImageToCloud, setFilename } from "../../model";

export function SaveImageButton() {
	const dispatch = useAppDispatch();
	const [currentProductId, setCurrentProductId] = useState<number>(0);
	async function handleClick() {
		try {
			let productId: number;
			console.log(ENV.VITE_ORIGIN_PRESTA);
			const params = new URLSearchParams(window.location.search);
			let token = params.get("token");

			if (!token) {
				token = "demo_token";
				console.warn("No token provided in URL, using demo token");
			}
			const tags = ["knitting", "motif"];
			const tagsCsv = Array.isArray(tags) ? tags.join(",") : tags;

			if (!currentProductId) {
				productId = await createMotifOnPresta({
					token,
					title: "My Motif",
					description: "Created with KnittedForYou",
					tags: tagsCsv,
				});
				console.log(
					"Motif created on PrestaShop with productId:",
					productId,
				);

				setCurrentProductId(productId);
				localStorage.setItem("kfy_productId", String(productId));

				dispatch(setFilename(productId.toString()));

				await dispatch(saveImageToCloud()).unwrap();
				await attachImageOnPresta({
					token,
					productId: productId,
				});
			} else {
				dispatch(setFilename(currentProductId.toString()));
			}

			dispatch(
				openDialog({
					variant: "success",
					title: "Saving successful.",
					message: "Your image has been successfully saved.",
				}),
			);
		} catch (error) {
			console.error(error);
			let details: null | string = null;
			if (error instanceof Error) {
				details = error.message;
			}
			dispatch(
				openDialog({
					variant: "error",
					title: "Saving failed.",
					message: "Error occured while saving your motif. Try again",
					details: details,
				}),
			);
		}
	}
	return (
		<ToolButton
			icon={Download}
			iconProps={{ size: 24 }}
			label={"Save"}
			onClick={handleClick}
		></ToolButton>
	);
}

function createMotifOnPresta({
	token,
	title,
	description,
	tags,
}: {
	token: string;
	title: string;
	description: string;
	tags: string | string[];
}) {
	return new Promise<number>((resolve, reject) => {
		console.log(
			"Creating motif on PrestaShop with token:",
			token,
			title,
			description,
			tags,
		);

		function onMessage(event: MessageEvent) {
			console.log("Received message event:", event);
			if (
				event.origin !== ENV.VITE_ORIGIN_PRESTA ||
				event.data?.type !== "CREATE_MOTIF_RESULT"
			)
				return;
			window.removeEventListener("message", onMessage);

			if (event.data.ok && event.data.data.productId) {
				resolve(event.data.data.productId);
			} else {
				reject(event.data.data);
			}
		}

		window.addEventListener("message", onMessage);

		window.parent.postMessage(
			{
				type: "CREATE_MOTIF",
				payload: { token, title, description, tags },
			},
			ENV.VITE_ORIGIN_PRESTA,
		);
	});
}

function attachImageOnPresta(payload: {
	token: string;
	productId: number;
}): Promise<void> {
	const expectedParentOrigin = document.referrer
		? new URL(document.referrer).origin
		: "";
	const parentOriginForSend = expectedParentOrigin || "*";

	return new Promise<void>((resolve, reject) => {
		const timeout = window.setTimeout(() => {
			window.removeEventListener("message", onMessage);
			reject(new Error("Timed out waiting for ATTACH_IMAGE_RESULT"));
		}, 10000);

		function onMessage(event: MessageEvent) {
			if (expectedParentOrigin && event.origin !== expectedParentOrigin)
				return;
			if (event.data?.type !== "ATTACH_IMAGE_RESULT") return;

			window.clearTimeout(timeout);
			window.removeEventListener("message", onMessage);

			if (event.data.ok) resolve();
			else reject(event.data.data);
		}

		window.addEventListener("message", onMessage);

		window.parent.postMessage(
			{ type: "ATTACH_IMAGE", payload },
			parentOriginForSend,
		);
	});
}
