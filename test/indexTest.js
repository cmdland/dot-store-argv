import dotEvent from "dot-event"
import dotStore from "dot-store"
import argv from "../dist/argv"

test("parse argv (and reload)", async () => {
  const events = dotEvent()
  const store = dotStore(events)

  argv({ events, store })

  await events.argv("test", {
    argv: ["hello", "-w"],
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true },
    raw: ["hello", "-w"],
  })

  await events.argv("test", {
    options: {
      alias: { world: ["w"] },
    },
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true, world: true },
    raw: ["hello", "-w"],
  })
})
