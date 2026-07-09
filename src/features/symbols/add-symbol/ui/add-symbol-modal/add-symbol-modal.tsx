import React, { useState } from "react";
import {
	addSymbol,
	getSymbolDescription,
	SYMBOL_ROWS,
	StitchSymbol,
} from "@/entities/canva";
import { setCurrentSymbolId } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { openDialog } from "@/entities/modal";
import { MAX_SYMBOLS } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Modal, Tooltip } from "@/shared/ui";
import { Button } from "@/shared/ui/button";

export function AddSymbolModal({
	isOpen,
	onClose,
}: Readonly<{
	isOpen: boolean;
	onClose: () => void;
}>) {
	const [symbol, setSymbol] = useState<StitchSymbol>(SYMBOL_ROWS[0]);
	const dispatch = useAppDispatch();
	const symbols = useAppSelector((state) => state.canvas.symbols);
	const maxSymbolsExceeded = MAX_SYMBOLS <= symbols.length;
	if (!isOpen) return;

	const handleSaveSymbol = () => {
		if (!symbol) return;
		if (maxSymbolsExceeded) {
			dispatch(
				openDialog({
					variant: "error",
					title: "Maximum symbols reached",
					message: `You can only have up to ${MAX_SYMBOLS} symbols in your palette. Please delete an existing symbol before adding a new one.`,
				}),
			);
			return;
		}
		const existingSymbolId = symbols.indexOf(symbol);
		const nextSymbolId =
			existingSymbolId === -1 ? symbols.length : existingSymbolId;
		dispatch(addSymbol(symbol));
		dispatch(setCurrentSymbolId(nextSymbolId));
		dispatch(
			addActionToHistory({ type: "ADD_SYMBOL", payload: { symbol } }),
		);
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="flex items-center justify-center"
		>
			<div className="flex flex-col bg-white p-4 rounded shadow-lg w-72 gap-2">
				<div className="py-1 border-b border-gray-100 flex items-center gap-3">
					<h2 className="text-lg font-bold text-gray-800">
						Add a new symbol
					</h2>
				</div>
				<div className="w-full h-12 flex items-center justify-center rounded border border-gray-300 mb-3 text-xl font-bold bg-gray-50 text-gray-800">
					<StitchSymbol
						symbol={symbol}
						svgClassName="w-8 h-8 text-gray-800"
						textClassName="text-xl font-bold text-gray-800"
						emptyClassName="text-gray-400 text-sm font-normal italic"
					/>
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<span className="text-sm text-gray-700">Pick:</span>
					<div className="grid grid-cols-4 gap-1.5 h-48 overflow-y-auto border border-gray-200 p-2 rounded">
						{SYMBOL_ROWS.map((s, index) => (
							<React.Fragment key={index}>
								<Tooltip
									key={index}
									text={getSymbolDescription(s)}
									position="top"
									className="w-full"
								>
									<button
										onClick={() => setSymbol(s)}
										className={`w-full h-10 flex items-center justify-center border rounded-lg text-lg transition-all duration-150 ${
											symbol === s
												? "border-blue-500 bg-blue-50 text-blue-800 font-bold scale-[1.02]"
												: "border-gray-200 hover:bg-gray-100 text-gray-600"
										}`}
									>
										<StitchSymbol
											symbol={s}
											svgClassName="w-6 h-6 text-current"
											textClassName="text-lg text-current"
											emptyClassName="text-gray-400 text-xs italic"
										/>
									</button>
								</Tooltip>
							</React.Fragment>
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
