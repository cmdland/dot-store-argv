import dotEvent from "dot-event"
import dotStore from "dot-store"
import dotArg from "../dist/arg"

test("parse arg and reload", async () => {
  const events = dotEvent()
  const store = dotStore(events)

  dotArg({ events, store })

  await events.arg("test", {
    arg: ["hello", "-w"],
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true },
    raw: ["hello", "-w"],
  })

  await events.arg("test", {
    alias: { world: ["w"] },
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true, world: true },
    raw: ["hello", "-w"],
  })
})
