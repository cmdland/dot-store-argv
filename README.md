# @dot-store/argv

Parse CLI arguments with `dot-store`.

![cli](https://78.media.tumblr.com/caa52add01c3234286dc688852ef33e5/tumblr_op0623jfYh1v22rhuo1_500.gif)

## Create store

```js
import createStore from "dot-store"
import argv from "@dot-store/argv"

const store = argv(createStore())
```

## Parse argv

Calling with arguments `hello -w`:

```js
await store.argv("options", process.argv.slice(2), {
  alias: { world: ["w"] },
})

store.get("options")
// {
//   _: ["hello"],
//   w: true,
//   world: true,
// }
```
