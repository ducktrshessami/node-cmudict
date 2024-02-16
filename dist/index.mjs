var Entry=class{constructor(name,tags=[]){this.name=name;this.pronunciations=[],this.tags=new Set(tags)}pronunciations;tags;addPronunciation(pronunciation,note){let newItem=new Pronunciation(this,pronunciation,note);return this.pronunciations.push(newItem),newItem}toString(){return this.tags&&this.pronunciations.length?[this.pronunciations[0].toString()+` # ${[...this.tags.values()].join(", ")}`,...this.pronunciations.slice(1)].join(`
`):this.pronunciations.join(`
`)}toJSON(){return{name:this.name,pronunciations:this.pronunciations.map(pronunciation=>pronunciation.toJSON()),tags:[...this.tags.values()]}}},Pronunciation=class{constructor(entry,phonemes,note=null){this.entry=entry;this.note=note;this.phonemes=phonemes.map(phoneme=>new Phoneme(phoneme))}phonemes;toString(){return`${this.entry.name} ${this.phonemes.join(" ")}`}toJSON(){let json={phonemes:this.phonemes.map(phoneme=>phoneme.toString())};return this.note&&(json.note=this.note),json}},Phoneme=class _Phoneme{constructor(raw){this.raw=raw;let match=raw.match(_Phoneme.Pattern);this.phoneme=match.groups.phoneme,this.stress=match.groups.stress?parseInt(match.groups.stress):null}static Pattern=/^(?<phoneme>[A-Z]+)(?<stress>[0-2])?$/i;phoneme;stress;toString(){return this.raw}};import{readFileSync}from"fs";import{join}from"path";import{fileURLToPath}from"url";function getDirname(){try{return __dirname}catch{return fileURLToPath(new URL("./",import.meta.url))}}var CMUdictPath=join(getDirname(),"../cmudict"),ArticulationManner=(ArticulationManner2=>(ArticulationManner2.Stop="stop",ArticulationManner2.Nasal="nasal",ArticulationManner2.Fricative="fricative",ArticulationManner2.Affricate="affricate",ArticulationManner2.Liquid="liquid",ArticulationManner2.Semivowel="semivowel",ArticulationManner2.Vowel="vowel",ArticulationManner2.Aspirate="aspirate",ArticulationManner2))(ArticulationManner||{});function mapIt(it,fn){let result=new Array;for(let value of it)result.push(fn(value));return result}function read(filename){return readFileSync(join(CMUdictPath,filename),{encoding:"utf8"})}function readPronunciations(filename,pattern){let entries=new Map;for(let match of read(filename).matchAll(pattern)){let entry=entries.get(match.groups.name)??new Entry(match.groups.name);match.groups.tags?.split(", ").forEach(tag=>entry.tags.add(tag)),entry.addPronunciation(match.groups.phonemes.split(" "),match.groups.note),entries.set(entry.name,entry)}return entries}function getDict(){return readPronunciations("cmudict.dict",/^(?<name>[^\s()]+)(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?:(?= #)| |$))+)(?: # (?<tags>(?:[^\s,]+(?:$|[\s,]+))+))?$/gmi)}function getPhones(){return new Map(mapIt(read("cmudict.phones").matchAll(/^(?<phoneme>[A-Z]+)\s+(?<manner>[A-Z]+)$/gmi),match=>[match[1],match[2]]))}function getSymbols(){return read("cmudict.symbols").match(/^\S+$/gm)}function getVP(){return readPronunciations("cmudict.vp",/^(?<name>[^A-Z\s]+)(?<note>[^\s()]+)?(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)/gmi)}export{ArticulationManner,Entry,Phoneme,Pronunciation,getDict,getPhones,getSymbols,getVP};
//# sourceMappingURL=index.mjs.map