import { useState } from "react";
import { ColorsPanel } from "./colors-panel";
import { SymbolsPanel } from "./symbols-panel";

export function PalettePanel() {
	const [tab, setTab] = useState<"colors" | "symbols">("colors");

	return (
		<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm gap-2 flex-col flex">
			<div className="flex gap-2">
				<button
					onClick={() => setTab("colors")}
					className={`border border-gray-300 px-3 py-1 rounded  text-gray-700 hover:border-gray-400 hover:shadow-sm cursor-pointer ${tab === "colors" ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105" : "bg-white"}`}
				>
					Colors
				</button>
				<button
					onClick={() => setTab("symbols")}
					className={`border border-gray-300 px-3 py-1 rounded text-gray-700 hover:border-gray-400 hover:shadow-sm cursor-pointer ${tab === "symbols" ? "bg-blue-500 text-white border-blue-500 shadow-md scale-105" : "bg-white"}`}
				>
					Symbols
				</button>
			</div>

			{tab === "colors" ? <ColorsPanel /> : <SymbolsPanel />}
		</div>
	);
}
