// Packages
import getopts from "getopts"

// Helpers
export { argvRelay } from "./argv/relay"

export default options => {
  const { events } = options

  if (events.ops.has("argv")) {
    return options
  }

  events
    .withOptions({
      cwd: process.cwd(),
    })
    .onAny({
      argv: async options => {
        const { alias, argv, event, props } = options

        const raw =
          argv || events.get([...props, "argv", "raw"])

        const opts = getopts(raw, event.options)

        for (const opt in opts) {
          if (opt.indexOf("-") > -1) {
            opts[camelcase(opt)] = opts[opt]
          }
        }

        const value = { alias, opts, raw }
        await events.set([...props, "argv"], value)
      },
    })

  return options
}

function camelcase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}
