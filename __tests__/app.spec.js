import { mount, shallowMount } from '@vue/test-utils'
import App from './../src/App.vue'

describe('Mounted App', () => {
    const wrapper = shallowMount(App);

    test('App has data function', () => {
        expect(typeof App.data).toBe('function')
    })
})