import {
    ArticulationManner,
    Phone,
    PhonePattern
} from "./phone";
import read from "./read";
import { mapIt } from "./util";

export const Phones = new Map<string, Phone>(
    mapIt(
        read("cmudict.phones")
            .matchAll(PhonePattern),
        match => {
            const phone: Phone = {
                phoneme: match[1],
                manner: <`${ArticulationManner}`>match[2]
            };
            return [phone.phoneme, phone];
        }
    )
);
export { ArticulationManner, Phone };

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols")
    .match(SymbolPattern)!;
