import Phone, { PhonePattern } from "./Phone";
import read from "./read";
import { mapIt } from "./util";

export const Phones = new Map<string, Phone>(
    mapIt(
        read("cmudict.phones")
            .matchAll(PhonePattern),
        match => {
            const phone = new Phone(match);
            return [phone.phoneme, phone];
        }
    )
);

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols")
    .match(SymbolPattern)!;
