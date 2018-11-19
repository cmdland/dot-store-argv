import getopts from "getopts"

export default options => {
  const { events, store } = options

  if (events.ops.has("argv")) {
    return options
  }

  events.onAny("argv", async options => {
    const { argv, event } = options

    const raw =
      argv || store.get([...(event.props || []), "raw"])

    const opts = getopts(raw, event.options)

    await store.set(event.props, { opts, raw })
  })

  return options
}
