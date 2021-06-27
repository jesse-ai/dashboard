import { Notyf } from 'notyf'

export default {
  install: (app, settings) => {
    app.config.globalProperties.notyf = new Notyf(settings)
    app.notyf = app.config.globalProperties.notyf
  }
}
