import getopts from "getopts"

export default store => {
  store.withOp("argv").onAny(async ({ event }) => {
    const { alias } = event.args[1] || {}
    const argv = getopts(event.args[0], {
      alias,
    })
    await store.set(event.props, argv)
  })
  return store
}
