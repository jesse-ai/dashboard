import { mount } from '@vue/test-utils'
import Exception from '../../src/components/Exception.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '../../src/stores/main'

describe('test exception component', () => {
    beforeEach(() => {
        // first mount component and props
        setActivePinia(createPinia())
        const main = useMainStore()
    })

    it('test copy button', async () => {
        const wrapper = mount(Exception, {
            props: {
                title: 'test title',
                content: 'some content about tests.',
                mode: 'backtest',
                session_id: 12345678
            }
        })
        // first watch see button with "copy" text
        expect(wrapper.find('[data-test="copyText"]').text()).toBe('Copy')
        await wrapper.find('[data-test="exceptionCopyButton"]').trigger('click')
        // now after click on copy button
        expect(wrapper.find('[data-test="copyText"]').text()).toBe('Copied')
    })

    it('test rest section', async () => {
        const wrapper = mount(Exception, {
            props: {
                title: 'test title',
                content: 'some content about tests.',
                mode: 'backtest',
                session_id: 12345678
            }
        })
        expect(wrapper.find('[data-test="reportText"]').text()).toBe('Report')
        // test html page have title and content
        expect(wrapper.html()).toContain('some content about tests.')
        expect(wrapper.html()).toContain('test title')

        const elements = mount(Exception, { shallow: true })
        // check exception has slide over
        expect(elements.html()).toContain('<slide-over')
    })
})
