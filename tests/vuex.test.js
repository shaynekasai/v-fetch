import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VueFetch from '../src/v-fetch.js'



const storeOpts = {
    state: {
        message: ''
    },
    mutations: {}
}


const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(VueFetch, {
    'vuexStore': storeOpts
});

const store = new Vuex.Store(storeOpts)

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve('fetch test'),
    })
);

const BaseComponent = {
    store,
    template: '',
    computed: {
        message () {
          return this.$store.state.message
        }
    }
}


describe('vuex', () => {
    it('tests vuex integration', async () => {
        const CustomComponent = Object.create(BaseComponent);
        CustomComponent.template = '<div><span>{{ message }}</span><a href="http://localhost/url" v-fetch:get="{updateModel:\'message\'}" v-on:click.prevent></a></div>';

        const wrapper = mount(CustomComponent, {
            localVue,
        });
        
        expect(wrapper.vm.message).toBe('')

        wrapper.find('a').trigger('click')
        await flushPromises();

        expect(wrapper.vm.message).toBe('fetch test')
    })
})