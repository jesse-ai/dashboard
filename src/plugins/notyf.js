import { Notyf } from 'notyf'

export default {
  install: (app, settings) => {
    settings.position.x = 'left'
    app.config.globalProperties.notyf = new Notyf(settings)
    app.notyf = app.config.globalProperties.notyf
  }
}
