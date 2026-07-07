export const DEFAULT_SYMBOLS = [
	"empty",
	"loopWithBar",
	"boldLetterB",
	"loopWithDot",
] as const;

export type StitchSymbol = string;

export interface StitchSymbolInfo {
	path: Path2D | null;
	pathStr?: string;
	isStroke: boolean;
	isFill: boolean;
	description: string;
}

export const SYMBOL_ROWS: string[][] = [
	[""],
	["*", "│"],
	["/", "─"],
	["+", "-"],
	["x"],
];
export const SYMBOL_SVG_SIZE = 32;
export const SYMBOLS_STRING_PATH: Record<string, string> = {
	empty: "",
	loopWithBar:
		"M 18 24 C 16 22, 12 18, 12 12 C 12 6, 20 6, 20 12 C 20 18, 16 22, 14 24 M 10 26 H 22",
	loopWithDot:
		"M 18 24 C 16 22, 12 18, 12 12 C 12 6, 20 6, 20 12 C 20 18, 16 22, 14 24 M 16 13 A 1 1 0 1 0 16 15 A 1 1 0 1 0 16 13",
	boldLetterB:
		"M 9 7 H 17 C 21 7, 21 15, 17 15 C 22 15, 22 25, 17 25 H 9 Z M 13 11 V 14 H 16 C 18 14, 18 11, 16 11 Z M13,18 V21 H16 C18,21,18,18,16,18 Z",
};
export const SYMBOL_INFO: Record<string, StitchSymbolInfo> = {
	empty: {
		path: null,
		isStroke: false,
		isFill: false,
		description: "Empty stitch (Knit)",
	},
	loopWithBar: {
		pathStr: SYMBOLS_STRING_PATH.loopWithBar,
		path: new Path2D(SYMBOLS_STRING_PATH.loopWithBar),
		isStroke: true,
		isFill: false,
		description: "P1 tbl on RS",
	},
	loopWithDot: {
		pathStr: SYMBOLS_STRING_PATH.loopWithDot,
		path: new Path2D(SYMBOLS_STRING_PATH.loopWithDot),
		isStroke: true,
		isFill: false,
		description: "K1 tbl on WS",
	},
	boldLetterB: {
		pathStr: SYMBOLS_STRING_PATH.boldLetterB,
		path: new Path2D(SYMBOLS_STRING_PATH.boldLetterB),
		isStroke: false,
		isFill: true,
		description: "K2tog on RS",
	},
};

export function getSymbolInfo(symbol: StitchSymbol): StitchSymbolInfo {
	if (symbol in SYMBOL_INFO) {
		return SYMBOL_INFO[symbol];
	}
	return {
		path: null,
		isStroke: true,
		isFill: false,
		description: `Custom symbol "${symbol}"`,
	};
}

export function getSymbolDescription(symbol: StitchSymbol): string {
	return getSymbolInfo(symbol).description;
}

export function getSymbolPath(symbol: StitchSymbol): Path2D | null {
	return getSymbolInfo(symbol).path;
}
export function getSymbolPathStr(symbol: StitchSymbol): string | undefined {
	return SYMBOLS_STRING_PATH[symbol];
}
export interface PathGroup {
	stroke: Path2D;
	fill: Path2D;
}

export function createPathGroup(): PathGroup {
	return {
		stroke: new Path2D(),
		fill: new Path2D(),
	};
}

export function addPathToGroup(
	group: PathGroup,
	path: Path2D,
	matrix?: DOMMatrix,
	options?: { isStroke?: boolean; isFill?: boolean },
) {
	const isStroke = options?.isStroke ?? true;
	const isFill = options?.isFill ?? false;

	if (isFill) {
		if (matrix) {
			group.fill.addPath(path, matrix);
		} else {
			group.fill.addPath(path);
		}
	}
	if (isStroke) {
		if (matrix) {
			group.stroke.addPath(path, matrix);
		} else {
			group.stroke.addPath(path);
		}
	}
}

export function addSymbolToGroup(
	group: PathGroup,
	symbol: StitchSymbol,
	matrix: DOMMatrix,
) {
	const info = getSymbolInfo(symbol);
	if (!info.path) return;
	addPathToGroup(group, info.path, matrix, {
		isStroke: info.isStroke,
		isFill: info.isFill,
	});
}
