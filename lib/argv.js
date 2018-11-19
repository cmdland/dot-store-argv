import getopts from "getopts"

export default options => {
  const { events, store } = options

  if (events.ops.has("arg")) {
    return options
  }

  events.onAny("argv", async options => {
    const { arg, event } = options

    const raw =
      arg || store.get([...(event.props || []), "raw"])

    const opts = getopts(raw, event.options)

    await store.set(event.props, { opts, raw })
  })

  return options
}
