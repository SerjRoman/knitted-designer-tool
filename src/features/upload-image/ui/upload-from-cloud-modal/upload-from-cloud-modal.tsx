import { useState } from "react";
import { useAppDispatch } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { uploadImageFromCloud } from "../../model";

export function UploadFromCloudModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const dispatch = useAppDispatch();
	const [filename, setFilename] = useState<string>("");
	const handleFileUpload = async () => {
		if (!filename) return;
		dispatch(uploadImageFromCloud(`${filename}`));
		onClose();
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose} doCloseOnClickOutside>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className=" bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="width-input"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Filename
							</label>
							<input
								id="width-input"
								value={filename}
								onChange={(e) => setFilename(e.target.value)}
								className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>
						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Cancel
							</button>
							<label className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Upload
								<button onClick={handleFileUpload} />
							</label>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
