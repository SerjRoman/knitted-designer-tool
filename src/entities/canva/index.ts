export * from "./model";
export * from "./lib";

import { StitchSymbol as StitchSymbolComponent } from "./ui";
import type { StitchSymbol as StitchSymbolType } from "./model";

type MergedStitchSymbol = StitchSymbolType;
const MergedStitchSymbol = StitchSymbolComponent;

export { MergedStitchSymbol as StitchSymbol };
