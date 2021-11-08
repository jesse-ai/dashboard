import { mount } from '@vue/test-utils'
import Divider from '../../src/components/Divider.vue'
import Logs from '../../src/components/Logs.vue'

test('test divider component', () => {
  const wrapper = mount(Divider, {
    slots: {
      default: 'test content'
    }
  })
  // check divider component display sended content in slot tag
  expect(wrapper.html()).toContain('test content')
})

test('test logs component', () => {
  const wrapper = mount(Logs, {
    props: {
      logs: ''
    }
  })
  // first check logs message when there is no logs
  expect(wrapper.html()).toContain('No logs available yet')

  // now add data to logs
  const loggedWrapper = mount(Logs, {
    props: {
      logs: 'test content'
    }
  })

  expect(loggedWrapper.html()).toContain('test content')
})

