import{Readable}from"stream";import{pipeline}from"stream/promises";import{extract}from"tar-fs";import{createGunzip}from"zlib";var CustomError=class extends Error{constructor(message){super(message),this.name=this.constructor.name}},InstallError=class extends CustomError{};import{join}from"path";import{fileURLToPath}from"url";function getDirname(){try{return __dirname}catch{return fileURLToPath(new URL("./",import.meta.url))}}var CMUdictPath=join(getDirname(),"../cmudict");var CMUdictURL="https://api.github.com/repos/cmusphinx/cmudict/tarball/master";function flattenTar(header){let index=header.name.lastIndexOf("/")+1;return index&&(header.name=header.name.slice(index)),header}console.debug("Fetching cmusphinx/cmudict");var res=await fetch(CMUdictURL);if(!res.ok)throw new InstallError(`Failed to fetch cmusphinx/cmudict: ${res.status} ${res.statusText}`);var reader=Readable.fromWeb(res.body),gz=createGunzip(),output=extract(CMUdictPath,{map:flattenTar});console.debug("Writing to ./cmudict");await pipeline(reader,gz,output);
//# sourceMappingURL=install.mjs.map