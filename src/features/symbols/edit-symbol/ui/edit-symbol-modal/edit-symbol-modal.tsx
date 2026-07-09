import { Fragment, useState } from "react";
import {
	getSymbolDescription,
	SYMBOL_ROWS,
	StitchSymbol,
} from "@/entities/canva";
import { useAppDispatch } from "@/shared/store";
import { Modal, Tooltip } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { changeSymbolToCustom } from "../../model";

export interface EditCustomSymbolModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedSymbol: StitchSymbol;
}

export function EditCustomSymbolModal({
	isOpen,
	onClose,
	selectedSymbol,
}: Readonly<EditCustomSymbolModalProps>) {
	const [customSymbol, setCustomSymbol] =
		useState<StitchSymbol>(selectedSymbol);
	const dispatch = useAppDispatch();
	if (!isOpen) return;

	const handleSaveSymbol = () => {
		if (!selectedSymbol) return;
		dispatch(
			changeSymbolToCustom({
				prevSymbol: selectedSymbol,
				newSymbol: customSymbol,
			}),
		);
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	if (!selectedSymbol) return;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="flex items-center justify-center"
		>
			<div className="flex flex-col bg-white p-4 rounded shadow-lg w-72 gap-2">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Edit symbol
					</h2>
				</div>
				<div className="w-full h-12 flex items-center justify-center rounded border border-gray-300 mb-3 text-xl font-bold bg-gray-50 text-gray-800">
					<StitchSymbol
						symbol={customSymbol}
						svgClassName="w-8 h-8 text-gray-800"
						textClassName="text-xl font-bold text-gray-800"
						emptyClassName="text-gray-400 text-sm font-normal italic"
					/>
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<span className="text-sm text-gray-700">Pick:</span>
					<div className="grid grid-cols-4 gap-1.5 h-48 overflow-y-auto border border-gray-200 p-2 rounded">
						{SYMBOL_ROWS.map((s, index) => (
							<Fragment key={index}>
								<Tooltip
									key={index}
									text={getSymbolDescription(s)}
									position="top"
									className="w-full"
								>
									<button
										onClick={() => setCustomSymbol(s)}
										className={`w-full h-10 flex items-center justify-center border rounded-lg text-lg transition-all duration-150 ${
											customSymbol === s
												? "border-blue-500 bg-blue-50 text-blue-800 font-bold scale-[1.02]"
												: "border-gray-200 hover:bg-gray-100 text-gray-600"
										}`}
									>
										<StitchSymbol
											symbol={s}
											textClassName="text-lg text-current"
											emptyClassName="text-gray-400 text-xs italic"
										/>
									</button>
								</Tooltip>
							</Fragment>
						))}
					</div>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button variant="cancel" onClick={handleCancel}>
						Cancel
					</Button>
					<Button onClick={handleSaveSymbol}>Apply</Button>
				</div>
			</div>
		</Modal>
	);
}
