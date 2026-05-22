import { useState } from "react";
import { useAppDispatch } from "@/shared/store";
import { Modal } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { changeSymbolToCustom } from "../../model";

export interface EditCustomSymbolModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedSymbol: string;
}

const ALL_SYMBOLS = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"=",
	"+",
	"[",
	"]",
	"{",
	"}",
	"|",
	"\\",
	";",
	":",
	"'",
	'"',
	",",
	".",
	"<",
	">",
	"/",
	"?",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"0",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
];

export function EditCustomSymbolModal({
	isOpen,
	onClose,
	selectedSymbol,
}: Readonly<EditCustomSymbolModalProps>) {
	const [customSymbol, setCustomSymbol] = useState(selectedSymbol);
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
					{customSymbol}
				</div>

				<div className="flex flex-col gap-2 mb-4">
					<span className="text-sm text-gray-700">Pick:</span>
					<div className="grid grid-cols-10 gap-1 h-32 overflow-y-auto border border-gray-200 p-1 rounded">
						{ALL_SYMBOLS.map((s) => (
							<button
								key={s}
								onClick={() => setCustomSymbol(s)}
								className={`w-6 h-6 flex items-center justify-center border rounded ${customSymbol === s ? "border-blue-500 bg-blue-100 text-blue-800" : "border-gray-200 hover:bg-gray-100 text-gray-600"}`}
							>
								{s}
							</button>
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
