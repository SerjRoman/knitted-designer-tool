import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolButton } from "@/entities/editor";
import { useModal } from "@/shared/lib";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { StatusModal } from "@/shared/ui";
import { saveImageToCloud, setFilename } from "../../model";

export function SaveImageButton() {
	const { error, status } = useAppSelector(
		(state) => state["features/saveImage"]
	);
	const [{ open: openStatusModal }, ModalStatusProvider] = useModal<{
		error: string | null;
		status: typeof status;
	}>();
	const dispatch = useAppDispatch();

	 // ✅ define state (fixes TS2304)
	const [currentProductId, setCurrentProductId] = useState<number | null>(() => {
		const v = localStorage.getItem("kfy_productId");
		return v ? Number(v) : null;
	});

	async function handleClick() {
		console.log("FULL URL:", window.location.href);
		console.log("SEARCH:", window.location.search);
		console.log("HASH:", window.location.hash);
		
		console.log("Saving image to cloud...");
		const params = new URLSearchParams(window.location.search);
		let token = params.get("token");
		console.log("token:", token);

		if (!token) {
	//		throw new Error("Missing token in URL");
			token = "demo_token";
			console.warn("No token provided in URL, using demo token");
		}
		let productId: number;

		if (!currentProductId) {	
			
			productId = await createMotifOnPresta({token});
			console.log("Motif created on PrestaShop with productId:", productId);

			setCurrentProductId(productId);        // state
			localStorage.setItem("kfy_productId", String(productId)); // optional persistence
		
					//dispatch(setFilename(productId.toString()));
		} else {
				//dispatch(setFilename(currentProductId.toString()));
			productId = currentProductId;
		}
		dispatch(setFilename(productId.toString()));
		await dispatch(saveImageToCloud());

		if (productId)	{
			await attachImageOnPresta({
				token, imgId: productId as any
			});
		}
	}
	useEffect(() => {

		const params = new URLSearchParams(window.location.search);
		const choice = params.get("choice"); // or productId param you use

		if (!choice) {
			// New motif session: force REQUEST_SAVE (modal)
			localStorage.removeItem("kfy_productId");
			setCurrentProductId(null);
		} else {
			// Edit existing
			const pid = Number(choice);
			setCurrentProductId(Number.isFinite(pid) ? pid : null);
			localStorage.setItem("kfy_productId", String(pid));
		}

		openStatusModal({ error, status });
	}, [error, openStatusModal, status]);
	return (
		<div className="flex justify-center col-span-2">
			<ToolButton
				icon={Download}
				iconProps={{ size: 24 }}
				label={"Save"}
				onClick={handleClick}
				className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex-1 "
			></ToolButton>

			<ModalStatusProvider
				ModalComponent={({ isOpen, onClose }) => {
					if (status === "loading" || status === "idle") return;
					return (
						<StatusModal
							isOpen={isOpen}
							onClose={onClose}
							variant={
								status === "succeeded" ? "success" : "error"
							}
							title={
								status === "succeeded"
									? "Motif Saved Successfully"
									: "Motif Save Failed"
							}
							message={
								status === "succeeded"
									? "Your motif has been successfully saved."
									: "An error occurred while saving the motif. Please try again later."
							}
							details={error}
						/>
					);
				}}
			/>
		</div>
	);
}

function createMotifOnPresta({ token }: {
  token: string;
}): Promise<number> {
  return new Promise<number>((resolve, reject) => {
	console.log("Creating motif on PrestaShop with token:"	);
    const ORIGIN_PRESTA = "https://motif.knittedforyou.com"; // your shop origin

    function onMessage(event: MessageEvent) {
      // parent -> iframe reply will come from presta origin
	  console.log("Received message event:", event);
      if (event.origin !== ORIGIN_PRESTA) return;
      if (!event.data || event.data.type !== "CREATE_MOTIF_RESULT") return;

      window.removeEventListener("message", onMessage);

	  const pid = event.data?.data?.data?.productId ?? event.data?.data?.productId;
      if (event.data.ok && (typeof pid === "number" || typeof pid === "string")) {
        resolve(Number(pid));
      } else {
        reject(event.data.data);
      }
    }

    window.addEventListener("message", onMessage);

    window.parent.postMessage(
      {
        type: "REQUEST_SAVE",
        payload: { token },
      },
      ORIGIN_PRESTA
    );
  });
}

function attachImageOnPresta(payload: { token: string; imgId: number;}): Promise<void> {
  const expectedParentOrigin = document.referrer ? new URL(document.referrer).origin : "";
  const parentOriginForSend = expectedParentOrigin || "*";

  return new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      window.removeEventListener("message", onMessage);
      reject(new Error("Timed out waiting for ATTACH_IMAGE_RESULT"));
    }, 10000);

    function onMessage(event: MessageEvent) {
      if (expectedParentOrigin && event.origin !== expectedParentOrigin) return;
      if (!event.data || event.data.type !== "ATTACH_IMAGE_RESULT") return;

      window.clearTimeout(timeout);
      window.removeEventListener("message", onMessage);

      if (event.data.ok) resolve();
      else reject(event.data.data);
    }

    window.addEventListener("message", onMessage);

    window.parent.postMessage(
      { type: "ATTACH_IMAGE", payload },
      parentOriginForSend
    );
  });
}
