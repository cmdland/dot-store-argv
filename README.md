# dot-store-argv

Parse CLI arguments with `dot-store`.

![cli](https://78.media.tumblr.com/caa52add01c3234286dc688852ef33e5/tumblr_op0623jfYh1v22rhuo1_500.gif)

## Create store

```js
import Store from "dot-store"
import argv from "dot-store-argv"

const store = argv(new Store())
```

## Parse argv

Calling with arguments "`hello -w`":

```js
await store.set("argv.myApp.alias", { world: ["w"] })
await store.set("argv.myApp.raw", process.argv.slice(2))

store.get("argv.myApp.parsed")
// {
//   _: ["hello"],
//   w: true,
//   world: true,
// }
```
