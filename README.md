# dot-store-argv

Parse CLI arguments with `dot-store`.

![cli](http://i.imgur.com/pQT0l.gif)

The default function returns a store composer upon receiving a namespace prop:

```js
import Store from "dot-store"
import argv from "dot-store-argv"

const store = argv("ns")(new Store())

await store.set("ns.argv.alias", { world: ["w"] })
await store.set("ns.argv.raw", ["hello", "-w"])

store.get("ns.argv.parsed")
// {
//   _: ["hello"],
//   w: true,
//   world: true,
// }
```
