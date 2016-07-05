import diff from "../src";
import fs from "fs";

const base = JSON.parse(fs.readFileSync(__dirname + "/base.json")),
      target = JSON.parse(fs.readFileSync(__dirname + "/target.json"));

var d = diff(base, target);

console.log(JSON.stringify(d, 0, 4));
