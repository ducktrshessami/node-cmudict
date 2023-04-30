import { readFileSync } from "fs";

export default function read(filename: string): string {
    return readFileSync(require.resolve(`cmudict/${filename}`), { encoding: "utf8" });
}
