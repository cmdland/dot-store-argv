export async function argvRelay(options) {
  const { event, events, props, store } = options
  const { alias } = store.get("argv")

  for (const [op] of Object.values(alias)) {
    const fn =
      event.op + op.charAt(0).toUpperCase() + op.slice(1)

    if (events[fn] && options[op]) {
      event.signal.returnValue = await events[fn](
        props,
        options
      )
    }
  }
}
