import { ChevronLeft, Copy, ImageIcon, Trash2, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import {
	setClipboardPoints,
	setClipboardOrigin,
	setTool,
} from "@/entities/editor";
import { selectActiveModal, toggleModal } from "@/entities/ui";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import {
	removeReferenceImage,
	selectReferences,
	type Reference,
} from "../../model";

export function ReferenceImageRnd() {
	const [chosenReference, setChosenReference] = useState<string | null>(null);
	const dispatch = useAppDispatch();
	const activeModal = useAppSelector(selectActiveModal);
	const references = useAppSelector(selectReferences);
	const horizontalCenter = window.innerWidth / 2;
	const verticalCenter = window.innerHeight / 2;
	function onClose() {
		dispatch(toggleModal("upload"));
	}
	if (activeModal !== "upload") return null;
	const referenceImage: Reference | null = chosenReference
		? (references.find((ref) => ref.id === chosenReference) ?? null)
		: null;

	return createPortal(
		<Rnd
			default={{
				x: horizontalCenter - 250,
				y: verticalCenter - 200,
				width: 500,
				height: 400,
			}}
			minWidth={320}
			minHeight={300}
			bounds="window"
			className="z-[1000] flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-shadow ring-1 ring-black/5"
			dragHandleClassName="modal-drag-handle"
		>
			<div className="modal-drag-handle flex h-12 items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-2 backdrop-blur-sm select-none">
				<div className="flex items-center gap-2">
					{chosenReference ? (
						<button
							onClick={() => setChosenReference(null)}
							className="group flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
						>
							<ChevronLeft size={16} />
							<span>Back</span>
						</button>
					) : (
						<div className="flex items-center gap-2 text-gray-700">
							<ImageIcon size={18} />
							<span className="font-semibold text-sm">
								References
							</span>
							<span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
								{references.length}
							</span>
						</div>
					)}
				</div>

				<button
					onClick={onClose}
					className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
				>
					<X size={18} />
				</button>
			</div>

			<div className="flex-1 overflow-hidden bg-gray-50/30">
				{chosenReference && referenceImage ? (
					<div className="h-full w-full overflow-auto p-4 bg-gray-50/50">
						<div className="relative group flex min-h-full min-w-full w-fit items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
							<img
								src={referenceImage.imageUrl}
								className="h-auto w-auto block"
								alt="Selected Reference"
							/>

							<div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sticky-actions">
								<button
									onClick={(e) => {
										e.stopPropagation();
										dispatch(
											setClipboardPoints(
												referenceImage.points,
											),
										);
										dispatch(
											setClipboardOrigin(
												referenceImage.originPoint,
											),
										);
										dispatch(setTool("paste"));
									}}
									className="flex items-center justify-center rounded-md bg-white p-2 text-gray-600 shadow-md ring-1 ring-gray-900/5 transition-colors hover:bg-blue-50 hover:text-blue-600"
									title="Copy to clipboard"
								>
									<Copy size={18} />
								</button>

								<button
									onClick={(e) => {
										e.stopPropagation();
										dispatch(
											removeReferenceImage({
												id: referenceImage.id,
											}),
										);
										setChosenReference(null);
									}}
									className="flex items-center justify-center rounded-md bg-white p-2 text-gray-600 shadow-md ring-1 ring-gray-900/5 transition-colors hover:bg-red-50 hover:text-red-600"
									title="Remove image"
								>
									<Trash2 size={18} />
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="h-full overflow-y-auto p-4">
						{references.length === 0 ? (
							<div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
								<ImageIcon
									size={48}
									className="mb-2 opacity-20"
								/>
								<p className="text-sm font-medium">
									No references yet
								</p>
								<p className="text-xs">
									Upload an image to see it here
								</p>
							</div>
						) : (
							<div className="grid grid-cols-3 gap-3">
								{references.map((ref) => (
									<div
										key={ref.id}
										className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
									>
										<img
											src={ref.imageUrl}
											alt="Reference thumbnail"
											className="h-full w-full object-cover"
										/>

										<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
											<button
												onClick={() =>
													setChosenReference(ref.id)
												}
												className="flex flex-col items-center text-white drop-shadow-md transform scale-90 transition-transform hover:scale-100"
											>
												<ZoomIn size={24} />
												<span className="text-xs font-medium mt-1">
													View
												</span>
											</button>
										</div>

										<button
											onClick={(e) => {
												e.stopPropagation();
												dispatch(
													removeReferenceImage({
														id: ref.id,
													}),
												);
											}}
											className="absolute top-1 right-1 rounded-md bg-white/90 p-1.5 text-gray-500 shadow-sm opacity-0 hover:bg-red-50 hover:text-red-600 transition-all group-hover:opacity-100"
											title="Remove image"
										>
											<Trash2 size={14} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</Rnd>,
		document.body,
	);
}
