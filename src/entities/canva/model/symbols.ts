export const DEFAULT_SYMBOLS = {
	empty: "",
	star: "*",
	vLine: "│",
	slash: "/",
	hLine: "─",
	plus: "+",
	minus: "-",
	x: "x",
};

export const SYMBOL_ROWS: string[][] = [
	[""],
	["*", "│"],
	["/", "─"],
	["+", "-"],
	["x"],
];

export const SYMBOL_DESCRIPTIONS: Record<string, string> = {
	"": "Empty stitch (Knit)",
	"*": "Garter stitch (Star)",
	"│": "Purl stitch",
	"/": "Right slant decrease",
	"─": "Horizontal line (Edge stitch)",
	"+": "Increase stitch (+)",
	"-": "Decrease stitch (-)",
	"x": "Slip stitch",
};

export function getSymbolDescription(symbol: string): string {
	return SYMBOL_DESCRIPTIONS[symbol] ?? `Custom symbol "${symbol}"`;
}

