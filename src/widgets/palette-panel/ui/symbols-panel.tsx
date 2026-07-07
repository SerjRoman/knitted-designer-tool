import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddSymbolModal } from "@/features/symbols/add-symbol";
import { EditCustomSymbolModal } from "@/features/symbols/edit-symbol";
import { mergeSymbol } from "@/features/symbols/merge-symbol";
import {
	getPixelsBySymbolWithSymbols,
	getSymbolDescription,
	getSymbolInfo,
	getSymbolPathStr,
	SYMBOL_SVG_SIZE,
} from "@/entities/canva";
import { setCurrentSymbolId } from "@/entities/editor";
import { useModal, MAX_SYMBOLS } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Tooltip } from "@/shared/ui";
import { SelectedPaint } from "./selected-paint";

export function SymbolsPanel() {
	const dispatch = useAppDispatch();
	const { currentSymbolId } = useAppSelector((state) => state.editor);
	const { symbols } = useAppSelector((state) => state.canvas);
	const currentSymbol = symbols[currentSymbolId] ?? symbols[0] ?? "";

	const [{ open: openEditSymbolModal }, EditSymbolModalProvider] = useModal<{
		selectedSymbol: string;
	}>();
	const [{ open: openAddNewSymbolModal }, ModalAddNewSymbolProvider] =
		useModal();

	const maxSymbolsExceeded = MAX_SYMBOLS <= symbols.length;
	const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
	const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

	return (
		<div className="grid grid-cols-7 gap-2">
			<div className="col-span-2 grid grid-rows-2 grid-cols-1 gap-3">
				<button
					onClick={() =>
						openEditSymbolModal({ selectedSymbol: currentSymbol })
					}
					className="row-span-1 flex items-center justify-center border border-gray-300 rounded-lg transition hover:brightness-90 cursor-pointer overflow-hidden"
				>
					<SelectedPaint />
				</button>
				<button
					className={`flex flex-row items-center justify-center p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
						maxSymbolsExceeded
							? "opacity-50 cursor-not-allowed"
							: ""
					}`}
					disabled={maxSymbolsExceeded}
					onClick={() => openAddNewSymbolModal()}
				>
					<PlusIcon size={20} /> Add
				</button>
			</div>

			<div className="col-span-5 grid grid-cols-4 row-auto gap-1">
				{symbols.map((symbol, index) => {
					const isSelected = currentSymbolId === index;
					const isDragged = draggedIdx === index;
					const isDragOver = dragOverIdx === index;

					return (
						<Tooltip
							key={symbol}
							text={getSymbolDescription(symbol)}
							position="top"
							className="w-12 h-12 flex items-center justify-center"
						>
							<button
								draggable
								onDragStart={(e) => {
									setDraggedIdx(index);
									e.dataTransfer.effectAllowed = "move";
								}}
								onDragOver={(e) => {
									e.preventDefault();
									if (draggedIdx !== index) {
										setDragOverIdx(index);
									}
								}}
								onDragLeave={() => setDragOverIdx(null)}
								onDrop={async (e) => {
									e.preventDefault();
									setDragOverIdx(null);
									setDraggedIdx(null);
									if (draggedIdx === null) return;
									if (draggedIdx === index) return;
									if (dragOverIdx === null) return;
									const symbolToMerge = symbols[draggedIdx];
									const targetSymbol = symbols[dragOverIdx];
									if (symbolToMerge === targetSymbol) return;
									if (!symbolToMerge || !targetSymbol) return;

									const pointsBefore = await dispatch(
										getPixelsBySymbolWithSymbols({
											symbol: symbols[draggedIdx],
										}),
									).unwrap();
									await dispatch(
										mergeSymbol({
											symbolToMerge,
											newSymbol: targetSymbol,
											pixels: pointsBefore,
										}),
									);
									dispatch(setCurrentSymbolId(dragOverIdx));
								}}
								onDragEnd={() => {
									setDraggedIdx(null);
									setDragOverIdx(null);
								}}
								className={`
									w-full h-full rounded border-2 flex items-center justify-center
									text-gray-500 transition-all duration-150 cursor-grab active:cursor-grabbing
									${
										isDragOver
											? "border-blue-500 scale-110 z-10 shadow-md bg-blue-50"
											: isDragged
												? "opacity-40 border-dashed border-gray-400"
												: isSelected
													? "border-gray-500 bg-gray-100 font-bold text-gray-800"
													: "border-gray-200 bg-white hover:border-gray-300"
									}`}
								onClick={() =>
									dispatch(setCurrentSymbolId(index))
								}
							>
								{(() => {
									if (!symbol) {
										return (
											<span className="text-gray-400 text-[10px] font-normal italic">
												(empty)
											</span>
										);
									}
									const info = getSymbolInfo(symbol);
									const pathStr = getSymbolPathStr(symbol);
									if (pathStr) {
										return (
											<svg
												viewBox={`0 0 ${SYMBOL_SVG_SIZE} ${SYMBOL_SVG_SIZE}`}
												className="w-8 h-8 text-current"
											>
												<path
													d={pathStr}
													fill={
														info.isFill
															? "currentColor"
															: "none"
													}
													stroke={
														info.isStroke
															? "currentColor"
															: "none"
													}
													strokeWidth={
														info.isStroke ? 1 : 0
													}
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										);
									}
									return (
										<span className="text-sm font-normal">
											{symbol}
										</span>
									);
								})()}
							</button>
						</Tooltip>
					);
				})}
			</div>

			<EditSymbolModalProvider ModalComponent={EditCustomSymbolModal} />
			<ModalAddNewSymbolProvider ModalComponent={AddSymbolModal} />
		</div>
	);
}
