import { mount, shallowMount } from '@vue/test-utils'
import CountryTable from '../src/components/CountryTable.vue'

describe('Mounted CountryTable', () => {
    const propObj = {
        key1: {
            UK: {
                capital: "London"
            }
        }
    }
    const wrapper = shallowMount(CountryTable, {
        propsData: {
            metaObject: propObj
        }
    });

    test('CountryTable has data function', () => {
        expect(typeof CountryTable.data).toBe('function')
    })
    test("Props Assignment is OK", () => {
        expect(wrapper.props().metaObject).toMatchObject(propObj)
    })
})