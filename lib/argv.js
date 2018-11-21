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

    for (const opt in opts) {
      if (opt.indexOf("-") > -1) {
        opts[camelcase(opt)] = opts[opt]
      }
    }

    await store.set(event.props, { opts, raw })
  })

  return options
}

function camelcase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}
