import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VueFetch from '../src/v-fetch.js'

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: 'fetch test' }),
    })
);

const localVue = createLocalVue();

const storeConfig = {
    state: {
        message: ''
    },
    mutations: {}
};

localVue.use(Vuex);
localVue.use(VueFetch, {
    'vuexStoreConfig': storeConfig
});

const store = new Vuex.Store(storeConfig);

describe('vuex', () => {
    it('tests vuex integration', async () => {
        const CustomComponent = {
            store,
            template: '<div><span>{{ message }}</span><a href="http://localhost/url" v-fetch:get="{updateModel:\'message\'}" v-on:click.prevent></a></div>',
            computed: {
                message () {
                  return this.$store.state.message
                }
            }
        };

        const wrapper = mount(CustomComponent, {
            localVue,
        });
        
        expect(wrapper.vm.message).toBe('');

        wrapper.find('a').trigger('click');
        await flushPromises();

        expect(wrapper.vm.message).toBe('fetch test');
    })

    it('tests vuex fail', async () => {
        const CustomComponent = {
            store,
            template: '<div><span>{{ thing }}</span><a href="http://localhost/url" v-fetch:get="{updateModel:\'aaa\'}" v-on:click.prevent></a></div>',
            computed: {
                thing () {
                  return this.$store.state.thing ? this.$store.state.thing : ''
                }
            }
        };

        const wrapper = mount(CustomComponent, {
            localVue,
        });
        
        expect(wrapper.vm.thing).toBe('');

        wrapper.find('a').trigger('click');
        await flushPromises();

        expect(wrapper.vm.thing).toBe('');
    })
})