import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notifier = new Notyf({
  duration: 5000,
  dismissible: true,
  ripple: false,
  position: { x: 'right', y: 'bottom' },
  types: [
    {
      type: 'info',
      background: '#009efa'
    }
  ]
})

export default notifier
