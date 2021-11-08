import { mount } from '@vue/test-utils'
import Divider from '../../src/components/Divider.vue'
import Logs from '../../src/components/Logs.vue'
import Checkbox from '../../src/components/Checkbox.vue'

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
  // now logs component display logs messages
  expect(loggedWrapper.html()).toContain('test content')
})

test('test checkbox component', () => {
  const wrapper = mount(Checkbox, {
    props: {
      title: 'test title',
      description: 'test description',
      object: { test: false },
      name: 'test'
    }
  })

  // check checkbox component display title and description
  expect(wrapper.html()).toContain('test title')
  expect(wrapper.html()).toContain('test description')

  // check click on input form, set checkbox value to true and object data will change
  wrapper.find('[data-test="checkboxInput"]').setValue(true)
  expect(wrapper.props().object).toEqual({ test: true })
})