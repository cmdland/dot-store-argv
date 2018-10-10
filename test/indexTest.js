import dotEvent from "dot-event"
import dotStore from "dot-store"
import argv from "../dist/argv"

test("parse argv", async () => {
  const events = dotEvent()
  const store = dotStore(events)

  argv({ events, store })

  await events.argv("test", {
    argv: ["hello", "-w"],
    options: {
      alias: { world: ["w"] },
    },
  })

  expect(store.get("argv.test")).toEqual({
    _: ["hello"],
    w: true,
    world: true,
  })
})
