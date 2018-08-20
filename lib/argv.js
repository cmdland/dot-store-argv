import getopts from "getopts"

export default store => {
  store.on("argv.{ns}.raw", async ({ ns, subscriber }) => {
    const alias = store.get(`argv.${ns}.alias`) || {}
    const parsedArgv = getopts(subscriber.value, {
      alias,
    })
    await store.set(`argv.${ns}.parsed`, parsedArgv)
  })
  return store
}
