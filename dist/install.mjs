import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { extract } from "tar-fs";
import { createGunzip } from "zlib";
import { join } from "path";
import { fileURLToPath } from "url";
//#region src/error.ts
var CustomError = class extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
};
var InstallError = class extends CustomError {};
//#endregion
//#region src/util.ts
function getDirname() {
	try {
		return __dirname;
	} catch {
		return fileURLToPath(new URL("./", import.meta.url));
	}
}
const CMUdictPath = join(getDirname(), "../cmudict");
//#endregion
//#region src/install.mts
const CMUdictURL = "https://api.github.com/repos/cmusphinx/cmudict/tarball/master";
function flattenTar(header) {
	const index = header.name.lastIndexOf("/") + 1;
	if (index) header.name = header.name.slice(index);
	return header;
}
console.debug("Fetching cmusphinx/cmudict");
const res = await fetch(CMUdictURL);
if (!res.ok) throw new InstallError(`Failed to fetch cmusphinx/cmudict: ${res.status} ${res.statusText}`);
const reader = Readable.fromWeb(res.body);
const gz = createGunzip();
const output = extract(CMUdictPath, { map: flattenTar });
console.debug("Writing to ./cmudict");
await pipeline(reader, gz, output);
//#endregion
export {};

//# sourceMappingURL=install.mjs.map