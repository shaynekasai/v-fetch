import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueFetch from '../src/v-fetch.js'


describe('helpers', () => {
    it('tests form data helper', async () => {
        let result = '';
        
        result = VueFetch.helpers.getBody({ 'foo': 'bar' }, { 'value': {} });
        expect(result).toBeNull();

        result = VueFetch.helpers.getBody({ 'foo': 'bar' }, { 'value': { } });
        expect(result).toBeNull();

        result = VueFetch.helpers.getBody({ 'foo': 'bar' }, { 'value': { 'sendAs': 'json' } });
        expect(result).toBe('{"foo":"bar"}');

        result = VueFetch.helpers.getBody({ 'foo': 'bar' }, { 'value': { 'sendAs': 'form' } });
        expect(result.get('foo')).toBe('bar');
    })

    it('tests event type', () => {
        let result = '';
        let el = document.createElement('form');
        let binding = {
            'value': {}
        }

        result = VueFetch.helpers.getEventType(el, binding);
        expect(result).toBe('submit');

        el = document.createElement('a');
        result = VueFetch.helpers.getEventType(el, binding);
        expect(result).toBe('click');

        el = document.createElement('form');
        binding = {
            'value': {
                'eventType': 'submit'
            }
        };
        result = VueFetch.helpers.getEventType(el, binding);
        expect(result).toBe('submit');

        el = document.createElement('select');
        binding = {
            'value': {
                'eventType': 'change'
            }
        };
        result = VueFetch.helpers.getEventType(el, binding);
        expect(result).toBe('change');

    })

    it('tests get url', () => {
        let result = '';
        let el = document.createElement('form');

        // simple form
        el.setAttribute('method', 'post');
        el.setAttribute('action', '/foo');
        result = VueFetch.helpers.getUrl(el, {
            'value': {}
        });
        expect(result).toBe('/foo');

        // simple form with binding
        el = document.createElement('form');
        el.setAttribute('method', 'post');
        el.setAttribute('action', '/foo');
        result = VueFetch.helpers.getUrl(el, {
            'value': {
                'url': '/baz'
            }
        });
        expect(result).toBe('/baz');

        // simple link
        el = document.createElement('a');
        el.setAttribute('href', '/bar');
        result = VueFetch.helpers.getUrl(el, {
            'value': {}
        });
        expect(result).toBe('/bar');

        // simple link with binding
        el = document.createElement('a');
        el.setAttribute('href', '/bar');
        result = VueFetch.helpers.getUrl(el, {
            'value': {
                'url': '/baz'
            }
        });
        expect(result).toBe('/baz');
    })
});