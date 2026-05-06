import { PlusIcon } from "lucide-react";
import { setCurrentSymbolId } from "@/entities/editor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { SelectedPaint } from "./selected-paint";

export function SymbolsPanel() {
	const dispatch = useAppDispatch();
	const { symbols } = useAppSelector((state) => state.canvas);
	const maxSymbolsExceeded = true;
	return (
		<>
			<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
				SYMBOLS
			</h3>
			<div className="grid grid-cols-7 gap-2 ">
				<div className="col-span-2 grid grid-rows-2 grid-cols-1 gap-3">
					<button
						onClick={() => 0} // TODO: open edit symbol modal}
						className="row-span-1 flex items-center justify-center border border-gray-300 rounded-lg transition hover:brightness-90 cursor-pointer overflow-hidden"
					>
						<SelectedPaint />
					</button>
					<button
						className={`flex flex-row items-center justify-center p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
							maxSymbolsExceeded &&
							"opacity-50 cursor-not-allowed"
						}`}
						onClick={() => 0} // TODO: open add symbol modal
						disabled
					>
						<PlusIcon size={20} /> Add
					</button>
				</div>
				<div className="col-span-5 grid grid-cols-4 row-auto gap-1">
					{symbols.map((symbol, index) => (
						<button
							key={symbol}
							className={`
                            w-12 h-12 rounded border-2 flex items-center justify-center
                            text-gray-500 
                            ${
								// currentSymbolId === index
								// ? "border-blue-500 bg-blue-200 text-black shadow-md"
								"border-gray-200 hover:border-gray-300"
							}`}
							onClick={() => {
								dispatch(setCurrentSymbolId(index));
							}}
						>
							{symbol}
						</button>
					))}
				</div>
			</div>
		</>
	);
}
