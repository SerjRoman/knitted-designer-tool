export * from "./model";
export * from "./lib";

import type { StitchSymbol as StitchSymbolType } from "./model";
import { StitchSymbol as StitchSymbolComponent } from "./ui";

type MergedStitchSymbol = StitchSymbolType;
const MergedStitchSymbol = StitchSymbolComponent;

export { MergedStitchSymbol as StitchSymbol };
