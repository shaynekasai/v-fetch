import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueFetch from '../src/v-fetch.js'

const BaseComponent = {
    data() {
        return {
            handlers: [],
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

describe('usage', () => {

    it('tests get basic', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><a href="http://localhost/url" v-fetch v-on:click.prevent></a></div>';

        const wrapper = mount(CustomComponent, {
            localVue,
        });

        wrapper.find('a').trigger('click')
        await flushPromises()

        expect(wrapper.emitted()['v-fetch:complete']).toBeTruthy()
    })

    it('tests get', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><a href="http://localhost/url" v-fetch:get="{updateModel:\'message\'}"  v-on:click.prevent></a></div>';

        const wrapper = mount(CustomComponent, {
            localVue,
        });

        wrapper.find('a').trigger('click')
        await flushPromises()

        expect(wrapper.vm.message).toBe('fetch test')
    })

    it('tests post simple', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><form method="post" action="http://localhost/url" v-fetch @submit.prevent><input type="hidden" name="message" value="post test"/></form></a></div>'
        
        const wrapper = mount(CustomComponent, {
            localVue
        });
        
        wrapper.find('form').trigger('submit')
        await flushPromises()

        expect(wrapper.emitted()['v-fetch:complete']).toBeTruthy()
    })

    it('tests post', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><form method="post" action="http://localhost/url" v-fetch="{updateModel:\'message\'}" @submit.prevent><input type="hidden" name="message" value="post test"/></form></a></div>'
        
        const wrapper = mount(CustomComponent, {
            localVue
        });
        
        wrapper.find('form').trigger('submit')
        await flushPromises()

        expect(wrapper.vm.message).toBe('fetch test')
    })

    it('tests handlers', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.methods = {
            onStartHandler() {
                this.handlers.push('start')
            },
            onCompleteHandler() {
                this.handlers.push('complete')
            },
            onErrorHandler() {
                this.handlers.push('error')
            }
        };
        CustomComponent.template = '<div><a href="http://localhost/url" v-fetch:get="{updateModel:\'message\', onStart:\'onStartHandler\', onComplete:\'onCompleteHandler\'}"  v-on:click.prevent></a></div>';

        const wrapper = mount(CustomComponent, {
            localVue,
        });

        wrapper.find('a').trigger('click')
        await flushPromises()

        expect(wrapper.vm.$data.handlers.sort()).toEqual(['complete', 'start'])
    })
})