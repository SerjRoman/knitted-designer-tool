import {
	getSymbolInfo,
	getSymbolPathStr,
	SYMBOL_SVG_SIZE,
	type StitchSymbol as StitchSymbolType,
} from "../model/symbols";

export interface StitchSymbolProps {
	symbol: StitchSymbolType;
	className?: string;
	svgClassName?: string;
	textClassName?: string;
	emptyClassName?: string;
	strokeWidth?: number;
}

export function StitchSymbol({
	symbol,
	className = "",
	svgClassName = "w-8 h-8 text-current",
	textClassName = "text-sm font-normal",
	emptyClassName = "text-gray-400 text-[10px] font-normal italic",
	strokeWidth,
}: Readonly<StitchSymbolProps>) {
	if (!symbol) {
		return (
			<span className={`${emptyClassName} ${className}`}>(empty)</span>
		);
	}

	const info = getSymbolInfo(symbol);
	const pathStr = getSymbolPathStr(symbol);

	if (pathStr) {
		const isStroke = info.isStroke;
		const isFill = info.isFill;
		const defaultStrokeWidth = strokeWidth ?? (isStroke ? 1 : 0);

		return (
			<svg
				viewBox={`0 0 ${SYMBOL_SVG_SIZE} ${SYMBOL_SVG_SIZE}`}
				className={`${svgClassName} ${className}`}
			>
				<path
					d={pathStr}
					fill={isFill ? "currentColor" : "none"}
					stroke={isStroke ? "currentColor" : "none"}
					strokeWidth={defaultStrokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	return <span className={`${textClassName} ${className}`}>{symbol}</span>;
}
