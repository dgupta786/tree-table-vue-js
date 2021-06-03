import { mount, shallowMount } from '@vue/test-utils'
import Header from '../src/components/Header.vue'

describe('Mounted Header', () => {
    const wrapper = shallowMount(Header);

    test('Header has data function', () => {
        expect(typeof Header.data).toBe('function')
    })
})