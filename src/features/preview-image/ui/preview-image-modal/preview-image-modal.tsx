import { useMemo } from "react";
import { createPortal } from "react-dom";
import { Rnd } from "react-rnd";
import { transformGridToApiFormat, useAppSelector } from "@/shared/lib";
import { Loader } from "@/shared/ui";
import { useGetPreviewImage } from "../../api";

export function PreviewImageModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const { grid, numberOfColumns, numberOfRows, colors } = useAppSelector(
		(state) => state.canvas
	);
	const horizontalCenter = window.innerWidth / 2;
	const verticalCenter = window.innerHeight / 2;

	const body = useMemo(
		() =>
			transformGridToApiFormat(
				grid,
				colors,
				numberOfColumns,
				numberOfRows
			),
		[colors, grid, numberOfColumns, numberOfRows]
	);
	const { data, isLoading, error, refetch } = useGetPreviewImage({ body });

	const doShowContent = true;

	if (!isOpen || !onClose) return null;

	return createPortal(
		<>
			<Rnd
				default={{
					x: horizontalCenter - verticalCenter / 2,
					y: verticalCenter - verticalCenter / 2,
					width: verticalCenter,
					height: verticalCenter,
				}}
                lockAspectRatio={1}
				minWidth={300}
				minHeight={200}
				bounds="window"
				className="z-[1000] flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl"
				dragHandleClassName="modal-drag-handle"
			>
				<div className="modal-drag-handle flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3 cursor-move select-none">
					<span style={{ fontWeight: 600 }}>Preview Image</span>
					<button onClick={onClose} style={{ cursor: "pointer" }}>
						✕
					</button>
				</div>

				<div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center overflow-hidden p-2">
					{doShowContent && (
						<img
							src="https://images.pexels.com/photos/20787/pexels-photo.jpg"
							// src={data}
							className="h-full w-full object-contain"
							alt=""
						/>
					)}
					{isLoading && (
						<>
							<Loader className="h-10 w-10 animate-spin text-blue-500" />
							<span className="text-sm text-gray-500">
								Loading...
							</span>
						</>
					)}
					{error && (
						<>
							<div className="text-red-500">
								<p className="font-medium">Error occured</p>
								<p className="text-sm text-gray-500">
									Could not load preview image
								</p>
							</div>
							<button
								className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								onClick={() => {
									refetch({ body });
								}}
							>
								Load again
							</button>
						</>
					)}
				</div>
			</Rnd>
		</>,
		document.body
	);
}
