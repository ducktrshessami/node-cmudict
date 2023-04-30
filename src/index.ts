import read from "./read";

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols").match(SymbolPattern)!;
