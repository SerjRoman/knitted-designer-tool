import { Download } from "lucide-react";
import { useEffect } from "react";
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
		const tags = ["knitting", "motif"];
		const tagsCsv = Array.isArray(tags) ? tags.join(",") : tags;

	if (!currentProductId) {	
		
		const productId = await createMotifOnPresta({token, title: "My Motif", description: "Created with KnittedForYou", tags: tagsCsv});
		console.log("Motif created on PrestaShop with productId:", productId);

setCurrentProductId(productId);        // state
localStorage.setItem("kfy_productId", String(productId)); // optional persistence
	
				dispatch(setFilename(productId.toString()));
		} else {
			dispatch(setFilename(currentProductId.toString()));
		}
	
		await dispatch(saveImageToCloud());

		if (productId)	{
			await attachImageOnPresta({
				token, productId: productId as any
			});
		}
	}
	useEffect(() => {
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

function createMotifOnPresta({ token, title, description, tags }: {
  token: string;
  title: string;
  description: string;
  tags: string | string[];
}) {
  return new Promise((resolve, reject) => {
	console.log("Creating motif on PrestaShop with token:", token, title, description, tags	);
    const ORIGIN_PRESTA = "http://dev.knittedforyou.com"; // your shop origin

    function onMessage(event: MessageEvent) {
      // parent -> iframe reply will come from presta origin
	  console.log("Received message event:", event);
      if (event.origin !== ORIGIN_PRESTA) return;
      if (!event.data || event.data.type !== "CREATE_MOTIF_RESULT") return;

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
        payload: { token, title, description, tags }
      },
      ORIGIN_PRESTA
    );
  });
}

function attachImageOnPresta(payload: { token: string; productId: number;}): Promise<void> {
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
