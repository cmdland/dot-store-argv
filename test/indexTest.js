import dotEvent from "dot-event"
import dotStore from "@dot-event/store"
import dotArg from "../dist/argv"

test("parse arg and reload", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  dotArg({ events, store })

  await events.argv("test", {
    argv: ["hello", "-w"],
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true },
    raw: ["hello", "-w"],
  })

  await events.argv("test", {
    alias: { world: ["w"] },
  })

  expect(store.get("test")).toEqual({
    opts: { _: ["hello"], w: true, world: true },
    raw: ["hello", "-w"],
  })
})
