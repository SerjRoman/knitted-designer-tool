import { Modal } from "@/shared/ui";

export function UploadTypeModal({
	isOpen,
	onClose,
	openModal,
}: {
	isOpen: boolean;
	onClose: () => void;
	openModal: (value: "cloud" | "user" | null) => void;
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
					<h2 className="text-lg font-semibold text-gray-800 mb-4">
						Choose where you want to upload the image from
					</h2>

					<div className="flex items-center justify-center gap-4">
						<button
							className="flex flex-col items-center justify-center px-4 py-3 w-1/2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
							onClick={() => {
								openModal("cloud");
								onClose();
							}}
						>
							Upload from Cloud
						</button>
						<button
							className="flex flex-col items-center justify-center px-4 py-3 w-1/2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
							onClick={() => {
								openModal("user");
								onClose();
							}}
						>
							Upload from your PC
						</button>
					</div>
					<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
