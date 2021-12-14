import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '../../src/stores/main'
import './window-mock'
import ThemeSwitch from '../../src/components/ThemeSwitch.vue'


describe('test component which use pinia store', () => {
    beforeEach(() => {
        // first mock pinia create store
        setActivePinia(createPinia())
    })

    it('test theme switch component', async () => {
        const main = useMainStore()
        main.theme = 'dark'
        expect(main.theme).toBe('dark')
        const wrapper = mount(ThemeSwitch)

        // click on the theme switch change local stoage 
        await wrapper.find('#theme-switch-button').trigger('click')
        expect(localStorage.getItem('theme')).toEqual('dark')
        await wrapper.find('#theme-switch-button').trigger('click')
        expect(localStorage.getItem('theme')).toEqual('light')
        expect(main.theme).toBe('light')
    })
})
