
import diff from "../src/diff";
import toRFC6902 from "../src/transformers/toRFC6902";
import fs from "fs";

const base = JSON.parse(fs.readFileSync(__dirname + "/base.json")),
      target = JSON.parse(fs.readFileSync(__dirname + "/target.json"));

var d = toRFC6902(diff(base, target));

console.log(JSON.stringify(d, 0, 4))
