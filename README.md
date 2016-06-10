# diffson

diff JSON

## Install

`npm install diffson`

## Depend

`import diffson from "diffson";`  
`var diffson = require("diffson");`  
`require(["diffson"], function(diffson){ /* ... */ });`

## Use

```js
var base = { /* ... */ };
var target = { /* ... */ };
var deltas = diffson(base, target);
```

Will return an array of deltas which, when applied sequentially, tarnsform
`base` into `target`.
