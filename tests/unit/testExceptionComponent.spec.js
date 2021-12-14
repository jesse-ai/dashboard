import { mount } from '@vue/test-utils'
import Exception from '../../src/components/Exception.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '../../src/stores/main'

describe('test exception component', () => {
    beforeEach(() => {
        // first mount component and props
        setActivePinia(createPinia())
    })

    it('test copy button', () => {
        const main = useMainStore()
        const wrapper = mount(Exception, {
            props: {
                title: 'test title',
                component: 'some content about tests.',
                mode: 'backtest',
                session_id: 12345678
            }
        })
        wrapper.find('[data-test="exceptionCopyButton"]').trigger('click')
        expect(wrapper.find("[data-test='exceptionCopyCheck']").exists()).toBe(true)
    })
})
