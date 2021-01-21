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
    });
});