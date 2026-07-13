export const SYMBOLS_STRING_PATH = {
	empty: "",
	knit: "M 8 8 H 24 V 24 H 8 Z",
	purl: "M 8 16 H 24",
	yarnOver: "M 16 11 A 5 5 0 1 0 16 21 A 5 5 0 1 0 16 11",
	cableFront: "M 8 24 L 14 18 M 18 14 L 24 8 M 24 24 L 8 8",
	cableBack: "M 24 24 L 18 18 M 14 14 L 8 8 M 8 24 L 24 8",
	loopWithBar:
		"M 18 24 C 16 22, 12 18, 12 12 C 12 6, 20 6, 20 12 C 20 18, 16 22, 14 24 M 10 26 H 22",
	loopWithDot:
		"M 18 24 C 16 22, 12 18, 12 12 C 12 6, 20 6, 20 12 C 20 18, 16 22, 14 24 M 16 13 A 1 1 0 1 0 16 15 A 1 1 0 1 0 16 13",
	boldLetterB:
		"M 9 7 H 17 C 21 7, 21 15, 17 15 C 22 15, 22 25, 17 25 H 9 Z M 13 11 V 14 H 16 C 18 14, 18 11, 16 11 Z M13,18 V21 H16 C18,21,18,18,16,18 Z",
	diagonalWithBranch: "M 8 24 L 24 8 M 16 16 L 24 24",
	diagonalSlash: "M 11 21 L 21 11",
	diagonalWithBranchAndBar: "M 8 24 L 24 8 M 16 16 L 24 24 M 12 26 H 20",
	diagonalSlashWithDot:
		"M 13 21 L 21 13 M 13 12 A 1 1 0 1 0 13 14 A 1 1 0 1 0 13 12",
	backDiagonalWithBranchAndBar: "M 24 24 L 8 8 M 16 16 L 8 24 M 12 26 H 20",
	backDiagonalSlashWithDot:
		"M 19 21 L 11 13 M 19 12 A 1 1 0 1 0 19 14 A 1 1 0 1 0 19 12",
	verticalWithLeftBranch: "M 16 6 V 26 M 16 14 L 10 8",
	wedgeWithTwo:
		"M 10 16 L 16 22 L 22 16 M 14 11 C 14 8, 18 8, 18 11 C 18 13, 14 15, 14 15 H 18",
	letterM: "M 9 24 V 8 L 16 18 L 23 8 V 24",
	boldLetterP:
		"M 9 7 H 17 C 22 7, 22 17, 17 17 H 13 V 25 H 9 Z M 13 10 V 14 H 16 C 18 14, 18 10, 16 10 Z",
	lettersMP:
		"M 5 24 V 8 L 10 17 L 15 8 V 24 M 19 8 V 24 M 19 8 H 24 C 27 8, 27 16, 24 16 H 19",
	diagonalWithLeftBranch: "M 10 24 L 22 8 M 15 15 L 9 9",
	lettersMR:
		"M 5 24 V 8 L 10 17 L 15 8 V 24 M 19 8 V 24 M 19 8 H 24 C 27 8, 27 16, 24 16 H 19 M 21 16 L 26 24",
	backDiagonalWithRightBranch: "M 22 24 L 10 8 M 17 15 L 23 9",
	lettersML: "M 5 24 V 8 L 10 17 L 15 8 V 24 M 19 8 V 24 H 26",
	liftedIncV: "M 11 14 L 16 22 L 21 10",
	verticalLeftV: "M 12 12 V 22 L 22 12",
	verticalRightV: "M 10 12 L 20 22 V 12",
	vWithBar: "M 10 10 L 16 22 L 22 10 M 12 25 H 20",
	vSymbol: "M 10 10 L 16 22 L 22 10",
	vWithMiddleBarAndBottomBar:
		"M 10 10 L 16 22 L 22 10 M 11 16 H 21 M 12 25 H 20",
	vWithMiddleBar: "M 10 10 L 16 22 L 22 10 M 11 16 H 21",
	tripleDiagonalWithBranch: "M 8 24 L 24 8 M 15 24 L 16 16 M 22 24 L 16 16",
	tripleDiagonalWithBranchAndBar:
		"M 8 24 L 24 8 M 15 24 L 16 16 M 22 24 L 16 16 M 10 26 H 22",
	tripleDiagonalWithBranchAndDot:
		"M 8 24 L 24 8 M 15 24 L 16 16 M 22 24 L 16 16 M 13 12 A 1 1 0 1 0 13 14 A 1 1 0 1 0 13 12",
	backTripleDiagonalWithBranch:
		"M 24 24 L 8 8 M 17 24 L 16 16 M 10 24 L 16 16",
	backTripleDiagonalWithBranchAndBar:
		"M 24 24 L 8 8 M 17 24 L 16 16 M 10 24 L 16 16 M 10 26 H 22",
	backTripleDiagonalWithBranchAndDot:
		"M 24 24 L 8 8 M 17 24 L 16 16 M 10 24 L 16 16 M 19 12 A 1 1 0 1 0 19 14 A 1 1 0 1 0 19 12",
	verticalWithTwoBranches: "M 16 6 V 26 M 16 16 L 10 22 M 16 16 L 22 22",
	uprightChevron: "M 10 22 L 16 10 L 22 22",
	simpleLoop:
		"M 18 24 C 16 22, 12 18, 12 12 C 12 6, 20 6, 20 12 C 20 18, 16 22, 14 24",
	solidDot: "M 16 11 A 5 5 0 1 0 16 21 A 5 5 0 1 0 16 11",
	tridentUp: "M 10 10 L 16 22 L 22 10 M 16 10 V 22",
	wedgeWithFour: "M 10 16 L 16 22 L 22 16 M 14 8 V 12 H 19 M 18 8 V 15",
	wedgeWithFive:
		"M 10 16 L 16 22 L 22 16 M 18 8 H 14 V 11.5 C 17 11.5, 17 15, 14 15",
	upwardChevronWithFour:
		"M 10 13 L 16 7 L 22 13 M 14 15 V 19 H 19 M 18 15 V 22",
	leftSlantingChevronWithFour:
		"M 13 10 L 16 7 L 22 13 M 14 15 V 19 H 19 M 18 15 V 22",
	centeredChevronWithFour:
		"M 10 13 L 16 7 L 22 13 M 14 15 V 19 H 19 M 18 15 V 22",
	centeredChevronWithFive:
		"M 10 13 L 16 7 L 22 13 M 18 15 H 14 V 18.5 C 17 18.5, 17 22, 14 22",
	doubleLoop:
		"M 10 24 C 11 22, 13 18, 13 13 C 13 8, 8 8, 8 13 C 8 18, 11 22, 12 24 C 14 24, 18 24, 20 24 C 21 22, 23 18, 23 13 C 23 8, 18 8, 18 13 C 18 18, 21 22, 22 24",
	circleWithTwo:
		"M 16 6 A 10 10 0 1 0 16 26 A 10 10 0 1 0 16 6 M 13.5 14 C 13.5 11, 18.5 11, 18.5 14 C 18.5 16.5, 13.5 19.5, 13.5 19.5 H 18.5",
	bindOffArc: "M 8 22 Q 16 12 24 22",
	boldLetterL: "M 9 7 H 14 V 20 H 23 V 25 H 9 Z",
	containedLastBoArc: "M 12 26 Q 20 12 28 26",
	castOnArc: "M 8 10 Q 16 22 24 10",
	plusSymbol: "M 16 10 V 22 M 10 16 H 22",
	cursiveDoubleLoop:
		"M 4 11 C 8 12, 14 15, 14 19 C 14 23, 10 23, 10 19 C 10 15, 13 12, 16 12 C 19 12, 22 15, 22 19 C 22 23, 18 23, 18 19 C 18 15, 22 12, 28 11",
} as const;

export type StitchSymbol = keyof typeof SYMBOLS_STRING_PATH;
export const DEFAULT_SYMBOLS: StitchSymbol[] = [
	"empty",
	"knit",
	"purl",
	"yarnOver",
	"diagonalWithBranch",
	"cableBack",
	"backTripleDiagonalWithBranch",
	"tripleDiagonalWithBranch"
];
export interface StitchSymbolInfo {
	path: Path2D | null;
	pathStr?: string;
	isStroke: boolean;
	isFill: boolean;
	description: string;
}

export const SYMBOL_ROWS: StitchSymbol[] = Object.keys(
	SYMBOLS_STRING_PATH,
) as StitchSymbol[];
export const SYMBOL_SVG_SIZE = 32;

export const SYMBOL_INFO: Record<string, StitchSymbolInfo> = {
	empty: {
		path: null,
		isStroke: false, 
		isFill: false,
		description: "Blank area"
	},
	knit: {
		pathStr: SYMBOLS_STRING_PATH.knit,
		path: new Path2D(SYMBOLS_STRING_PATH.knit),
		isStroke: true,
		isFill: false,
		description: "Knit stitch",
	},
	purl: {
		pathStr: SYMBOLS_STRING_PATH.purl,
		path: new Path2D(SYMBOLS_STRING_PATH.purl),
		isStroke: true,
		isFill: false,
		description: "Purl stitch",
	},
	yarnOver: {
		pathStr: SYMBOLS_STRING_PATH.yarnOver,
		path: new Path2D(SYMBOLS_STRING_PATH.yarnOver),
		isStroke: true,
		isFill: false,
		description: "Yarn over",
	},
	cableFront: {
	pathStr: SYMBOLS_STRING_PATH.cableFront,
	path: new Path2D(SYMBOLS_STRING_PATH.cableFront),
	isStroke: true,
	isFill: false,
	description: "Cable cross, front (e.g. C4F)",
	},
	cableBack: {
		pathStr: SYMBOLS_STRING_PATH.cableBack,
		path: new Path2D(SYMBOLS_STRING_PATH.cableBack),
		isStroke: true,
		isFill: false,
		description: "Cable cross, back (e.g. C4B)",
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
	diagonalWithBranch: {
		pathStr: SYMBOLS_STRING_PATH.diagonalWithBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.diagonalWithBranch),
		isStroke: true,
		isFill: false,
		description: "K2tog on RS",
	},
	diagonalSlash: {
		pathStr: SYMBOLS_STRING_PATH.diagonalSlash,
		path: new Path2D(SYMBOLS_STRING_PATH.diagonalSlash),
		isStroke: true,
		isFill: false,
		description: "P2tog on WS",
	},
	diagonalWithBranchAndBar: {
		pathStr: SYMBOLS_STRING_PATH.diagonalWithBranchAndBar,
		path: new Path2D(SYMBOLS_STRING_PATH.diagonalWithBranchAndBar),
		isStroke: true,
		isFill: false,
		description: "P2tog on RS",
	},
	diagonalSlashWithDot: {
		pathStr: SYMBOLS_STRING_PATH.diagonalSlashWithDot,
		path: new Path2D(SYMBOLS_STRING_PATH.diagonalSlashWithDot),
		isStroke: true,
		isFill: false,
		description: "k2tog on WS",
	},
	backDiagonalWithBranchAndBar: {
		pathStr: SYMBOLS_STRING_PATH.backDiagonalWithBranchAndBar,
		path: new Path2D(SYMBOLS_STRING_PATH.backDiagonalWithBranchAndBar),
		isStroke: true,
		isFill: false,
		description: "SSP on RS,",
	},
	backDiagonalSlashWithDot: {
		pathStr: SYMBOLS_STRING_PATH.backDiagonalSlashWithDot,
		path: new Path2D(SYMBOLS_STRING_PATH.backDiagonalSlashWithDot),
		isStroke: true,
		isFill: false,
		description: "SSK on WS",
	},
	verticalWithLeftBranch: {
		pathStr: SYMBOLS_STRING_PATH.verticalWithLeftBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.verticalWithLeftBranch),
		isStroke: true,
		isFill: false,
		description: "K1fb on RS",
	},
	wedgeWithTwo: {
		pathStr: SYMBOLS_STRING_PATH.wedgeWithTwo,
		path: new Path2D(SYMBOLS_STRING_PATH.wedgeWithTwo),
		isStroke: true,
		isFill: false,
		description: "p1fb on WS",
	},
	letterM: {
		pathStr: SYMBOLS_STRING_PATH.letterM,
		path: new Path2D(SYMBOLS_STRING_PATH.letterM),
		isStroke: true,
		isFill: false,
		description: "Make 1 (M1) knitwise on RS, make 1 (M1) purlwise on WS",
	},
	boldLetterP: {
		pathStr: SYMBOLS_STRING_PATH.boldLetterP,
		path: new Path2D(SYMBOLS_STRING_PATH.boldLetterP),
		isStroke: false,
		isFill: true,
		description: "Make 1 (M1) purlwise on RS",
	},
	lettersMP: {
		pathStr: SYMBOLS_STRING_PATH.lettersMP,
		path: new Path2D(SYMBOLS_STRING_PATH.lettersMP),
		isStroke: true,
		isFill: false,
		description: "Make 1 (M1) knitwise on WS",
	},
	diagonalWithLeftBranch: {
		pathStr: SYMBOLS_STRING_PATH.diagonalWithLeftBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.diagonalWithLeftBranch),
		isStroke: true,
		isFill: false,
		description: "Right-slanting make 1",
	},
	lettersMR: {
		pathStr: SYMBOLS_STRING_PATH.lettersMR,
		path: new Path2D(SYMBOLS_STRING_PATH.lettersMR),
		isStroke: true,
		isFill: false,
		description: "Right-slanting make 1 (alternative)",
	},
	backDiagonalWithRightBranch: {
		pathStr: SYMBOLS_STRING_PATH.backDiagonalWithRightBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.backDiagonalWithRightBranch),
		isStroke: true,
		isFill: false,
		description: "Left-slanting make 1",
	},
	lettersML: {
		pathStr: SYMBOLS_STRING_PATH.lettersML,
		path: new Path2D(SYMBOLS_STRING_PATH.lettersML),
		isStroke: true,
		isFill: false,
		description: "Left-slanting make 1 (alternative)",
	},
	liftedIncV: {
		pathStr: SYMBOLS_STRING_PATH.liftedIncV,
		path: new Path2D(SYMBOLS_STRING_PATH.liftedIncV),
		isStroke: true,
		isFill: false,
		description: "Right-slanting lifted inc",
	},
	verticalLeftV: {
		pathStr: SYMBOLS_STRING_PATH.verticalLeftV,
		path: new Path2D(SYMBOLS_STRING_PATH.verticalLeftV),
		isStroke: true,
		isFill: false,
		description: "Left-slanting lifted inc",
	},
	tripleDiagonalWithBranch: {
		pathStr: SYMBOLS_STRING_PATH.tripleDiagonalWithBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.tripleDiagonalWithBranch),
		isStroke: true,
		isFill: false,
		description: "K3tog on RS, p3tog on WS",
	},
	tripleDiagonalWithBranchAndBar: {
		pathStr: SYMBOLS_STRING_PATH.tripleDiagonalWithBranchAndBar,
		path: new Path2D(SYMBOLS_STRING_PATH.tripleDiagonalWithBranchAndBar),
		isStroke: true,
		isFill: false,
		description: "P3tog on RS",
	},
	tripleDiagonalWithBranchAndDot: {
		pathStr: SYMBOLS_STRING_PATH.tripleDiagonalWithBranchAndDot,
		path: new Path2D(SYMBOLS_STRING_PATH.tripleDiagonalWithBranchAndDot),
		isStroke: true,
		isFill: false,
		description: "K3tog on WS (alternative)",
	},
	backTripleDiagonalWithBranch: {
		pathStr: SYMBOLS_STRING_PATH.backTripleDiagonalWithBranch,
		path: new Path2D(SYMBOLS_STRING_PATH.backTripleDiagonalWithBranch),
		isStroke: true,
		isFill: false,
		description: "SK2P on RS, SSSK on RS, SSSP on WS",
	},
	backTripleDiagonalWithBranchAndBar: {
		pathStr: SYMBOLS_STRING_PATH.backTripleDiagonalWithBranchAndBar,
		path: new Path2D(
			SYMBOLS_STRING_PATH.backTripleDiagonalWithBranchAndBar,
		),
		isStroke: true,
		isFill: false,
		description: "SSSP on RS",
	},
	backTripleDiagonalWithBranchAndDot: {
		pathStr: SYMBOLS_STRING_PATH.backTripleDiagonalWithBranchAndDot,
		path: new Path2D(
			SYMBOLS_STRING_PATH.backTripleDiagonalWithBranchAndDot,
		),
		isStroke: true,
		isFill: false,
		description: "SSSK on WS",
	},
	verticalWithTwoBranches: {
		pathStr: SYMBOLS_STRING_PATH.verticalWithTwoBranches,
		path: new Path2D(SYMBOLS_STRING_PATH.verticalWithTwoBranches),
		isStroke: true,
		isFill: false,
		description: "S2KP2 on RS",
	},
	uprightChevron: {
		pathStr: SYMBOLS_STRING_PATH.uprightChevron,
		path: new Path2D(SYMBOLS_STRING_PATH.uprightChevron),
		isStroke: true,
		isFill: false,
		description: "SSPP2 on WS",
	},
	simpleLoop: {
		pathStr: SYMBOLS_STRING_PATH.simpleLoop,
		path: new Path2D(SYMBOLS_STRING_PATH.simpleLoop),
		isStroke: true,
		isFill: false,
		description: "K1 tbl on RS, p1 tbl on WS",
	},
	solidDot: {
		pathStr: SYMBOLS_STRING_PATH.solidDot,
		path: new Path2D(SYMBOLS_STRING_PATH.solidDot),
		isStroke: false,
		isFill: true,
		description: "Bobble",
	},
	tridentUp: {
		pathStr: SYMBOLS_STRING_PATH.tridentUp,
		path: new Path2D(SYMBOLS_STRING_PATH.tridentUp),
		isStroke: true,
		isFill: false,
		description: "Inc 1-to-3",
	},
	wedgeWithFour: {
		pathStr: SYMBOLS_STRING_PATH.wedgeWithFour,
		path: new Path2D(SYMBOLS_STRING_PATH.wedgeWithFour),
		isStroke: true,
		isFill: false,
		description: "Inc 1-to-4",
	},
	wedgeWithFive: {
		pathStr: SYMBOLS_STRING_PATH.wedgeWithFive,
		path: new Path2D(SYMBOLS_STRING_PATH.wedgeWithFive),
		isStroke: true,
		isFill: false,
		description: "Inc 1-to-5",
	},
	upwardChevronWithFour: {
		pathStr: SYMBOLS_STRING_PATH.upwardChevronWithFour,
		path: new Path2D(SYMBOLS_STRING_PATH.upwardChevronWithFour),
		isStroke: true,
		isFill: false,
		description: "Dec 4-to-1 (right slanting)",
	},
	leftSlantingChevronWithFour: {
		pathStr: SYMBOLS_STRING_PATH.leftSlantingChevronWithFour,
		path: new Path2D(SYMBOLS_STRING_PATH.leftSlantingChevronWithFour),
		isStroke: true,
		isFill: false,
		description: "Dec 4-to-1 (left slanting)",
	},
	centeredChevronWithFour: {
		pathStr: SYMBOLS_STRING_PATH.centeredChevronWithFour,
		path: new Path2D(SYMBOLS_STRING_PATH.centeredChevronWithFour),
		isStroke: true,
		isFill: false,
		description: "Dec 4-to-1 (centered)",
	},
	centeredChevronWithFive: {
		pathStr: SYMBOLS_STRING_PATH.centeredChevronWithFive,
		path: new Path2D(SYMBOLS_STRING_PATH.centeredChevronWithFive),
		isStroke: true,
		isFill: false,
		description: "Dec 5-to-1",
	},
	cursiveDoubleLoop: {
		pathStr: SYMBOLS_STRING_PATH.cursiveDoubleLoop,
		path: new Path2D(SYMBOLS_STRING_PATH.cursiveDoubleLoop),
		isStroke: true,
		isFill: false,
		description: "K1, wrapping yarn twice around needle",
	},

	
	bindOffArc: {
		pathStr: SYMBOLS_STRING_PATH.bindOffArc,
		path: new Path2D(SYMBOLS_STRING_PATH.bindOffArc),
		isStroke: true,
		isFill: false,
		description: "Bind off",
	},
	boldLetterL: {
		pathStr: SYMBOLS_STRING_PATH.boldLetterL,
		path: new Path2D(SYMBOLS_STRING_PATH.boldLetterL),
		isStroke: false,
		isFill: true,
		description: "St rem on right needle after last BO st",
	},
		castOnArc: {
		pathStr: SYMBOLS_STRING_PATH.castOnArc,
		path: new Path2D(SYMBOLS_STRING_PATH.castOnArc),
		isStroke: true,
		isFill: false,
		description: "Cast on",
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
	if (symbol in SYMBOLS_STRING_PATH) {
		return SYMBOLS_STRING_PATH[symbol as keyof typeof SYMBOLS_STRING_PATH];
	}
	return undefined;
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
