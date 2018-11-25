import dotEvent from "dot-event"
import dotStore from "@dot-event/store"
import dotArg, { argvRelay } from "../"

test("parse arg and reload", async () => {
  const events = dotEvent()

  dotArg({ events })
  dotStore({ events })

  await events.argv("test", {
    argv: ["hello", "-w"],
  })

  const opts = { _: ["hello"], w: true }

  expect(events.get("test")).toEqual({
    argv: {
      opts,
      raw: ["hello", "-w"],
    },
  })

  const alias = { world: ["w"] }

  await events.argv("test", { alias })

  expect(events.get("test")).toEqual({
    argv: {
      alias,
      opts: { ...opts, world: true },
      raw: ["hello", "-w"],
    },
  })
})

test("camelcase dashes", async () => {
  const events = dotEvent()

  dotArg({ events })
  dotStore({ events })

  await events.argv("test", {
    argv: ["--hello-world"],
  })

  expect(events.get("test")).toEqual({
    argv: {
      opts: {
        _: [],
        "hello-world": true,
        helloWorld: true,
      },
      raw: ["--hello-world"],
    },
  })
})

test("argv relay", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  dotArg({ events, store })

  const actions = []

  await events.argv({
    alias: { t: ["test"] },
    argv: [],
  })

  events.onAny({
    fixture: argvRelay,
    fixtureTest: () => actions.push("run"),
  })

  await events.fixture({ test: true })

  expect(actions).toEqual(["run"])
})
