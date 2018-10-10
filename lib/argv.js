import getopts from "getopts"

export default options => {
  const { events, store } = options

  if (events.ops.has("argv")) {
    return options
  }

  events.onAny("argv", async ({ argv, event, options }) => {
    const opts = getopts(argv, options)
    await store.set(["argv", ...event.props], opts)
  })

  return options
}
