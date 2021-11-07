import { mount } from '@vue/test-utils'
import Divider from '../../src/components/Divider.vue'

test('test divider component', () => {
  const wrapper = mount(Divider, {
    slots: {
      default: 'test content'
    }
  })

  expect(wrapper.html()).toContain('test content')
})

