import Store from "dot-store"
import argv from "../dist/argv"

test("parse argv", async () => {
  const store = argv(new Store())
  await store.set("argv.test.alias", { world: ["w"] })
  await store.set("argv.test.raw", ["hello", "-w"])
  expect(store.get("argv.test.parsed")).toEqual({
    _: ["hello"],
    w: true,
    world: true,
  })
})
