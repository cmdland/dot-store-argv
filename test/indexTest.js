import Store from "dot-store"
import argv from "../dist/argv"

test("parse argv", async () => {
  const store = argv(new Store())
  await store.argv("test", ["hello", "-w"], {
    alias: { world: ["w"] },
  })
  expect(store.get("test")).toEqual({
    _: ["hello"],
    w: true,
    world: true,
  })
})
