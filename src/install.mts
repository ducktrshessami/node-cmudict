import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { ReadableStream } from "stream/web";
import { Headers, extract } from "tar-fs";
import { createGunzip } from "zlib";
import { InstallError } from "./error";
import { CMUdictPath } from "./util";

const CMUdictURL = "https://api.github.com/repos/cmusphinx/cmudict/tarball/master";

function flattenTar(header: Headers): Headers {
    const index = header.name.lastIndexOf("/") + 1;
    if (index) {
        header.name = header.name.slice(index);
    }
    return header;
}

console.debug("Fetching cmusphinx/cmudict");
const res = await fetch(CMUdictURL);
if (!res.ok) {
    throw new InstallError(`Failed to fetch cmusphinx/cmudict: ${res.status} ${res.statusText}`);
}
const reader = Readable.fromWeb(res.body as ReadableStream);
const gz = createGunzip();
const output = extract(CMUdictPath, { map: flattenTar });
console.debug("Writing to ./cmudict");
await pipeline(reader, gz, output);
