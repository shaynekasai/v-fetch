import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueFetch from '../src/v-fetch.js'

const BaseComponent = {
    data() {
        return {
            message: ''
        }
    },
    template: ''
}

const localVue = createLocalVue()
localVue.use(VueFetch);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve('fetch test'),
    })
);

describe('events', () => {
    it('tests events', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><form method="post" action="http://localhost/url" v-fetch="{model:\'message\'}" @submit.prevent><input type="hidden" name="message" value="post test"/></form></a></div>';
        
        const wrapper = mount(CustomComponent, {
            localVue
        });
        
        wrapper.find('form').trigger('submit')
        await flushPromises()

        expect(wrapper.emitted()['v-fetch:start']).toBeTruthy()
        expect(wrapper.emitted()['v-fetch:complete']).toBeTruthy()
    })
})