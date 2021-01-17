import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueFetch from '../src/vue-fetch.js'

const localVue = createLocalVue()
localVue.use(VueFetch);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve('fetch test'),
    })
);

describe('usage', () => {
    it('tests get', async () => {
        
        const MessageComponent = {
            data() {
                return {
                    message: ''
                }
            },
            template: '<div><a href="http://localhost/url" v-fetch:get="{model:\'message\'}"  v-on:click.prevent></a></div>'
        }
        
        const wrapper = mount(MessageComponent, {
            localVue
        });

        wrapper.find('a').trigger('click')
        // await flushPromises()

        // expect(wrapper.vm.message).toBe('fetch test')
    })

    // it('tests post', async () => {
    //     const MessageComponent = {
    //         data() {
    //             return {
    //                 message: ''
    //             }
    //         },
    //         template: '<div><form method="post" action="http://localhost/url" v-fetch="{model:\'message\'}" @submit.prevent><input type="hidden" name="message" value="post test"/></form></a></div>'
    //     }
        
    //     const wrapper = mount(MessageComponent, {
    //         localVue
    //     });
        
    //     wrapper.find('form').trigger('submit')
    //     await flushPromises()

    //     expect(wrapper.vm.message).toBe('fetch test')
    // })
})