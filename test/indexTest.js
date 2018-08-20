import Store from "dot-store"
import argv from "../dist/argv"

test("parse argv", async () => {
  const store = argv("test")(new Store())
  await store.set("test.argv.alias", { world: ["w"] })
  await store.set("test.argv.raw", ["hello", "-w"])
  expect(store.get("test.argv.parsed")).toEqual({
    _: ["hello"],
    w: true,
    world: true,
  })
})
