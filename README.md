# dot-store-argv

Parse CLI arguments with `dot-store`.

![cli](http://i.imgur.com/pQT0l.gif)

## Create store

```js
import Store from "dot-store"
import argv from "dot-store-argv"

const store = argv("myApp")(new Store())
```

## Parse argv

Calling with arguments "`hello -w`":

```js
await store.set("myApp.argv.alias", { world: ["w"] })
await store.set("myApp.argv.raw", process.argv.slice(2))

store.get("myApp.argv.parsed")
// {
//   _: ["hello"],
//   w: true,
//   world: true,
// }
```
