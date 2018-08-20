import getopts from "getopts"

export default ns => {
  return store => {
    store.on(`${ns}.argv.raw`, async ({ subscriber }) => {
      const alias = store.get(`${ns}.argv.alias`) || {}
      const parsedArgv = getopts(subscriber.value, {
        alias,
      })
      await store.set(`${ns}.argv.parsed`, parsedArgv)
    })
    return store
  }
}
