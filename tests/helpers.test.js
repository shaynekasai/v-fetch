import { it } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueFetch from '../src/v-fetch.js'


describe('helpers', () => {
    it('tests getBody()', async () => {
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

    it('tests getEventType()', () => {
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

    it('tests getUrl()', () => {
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

    it('tests getJsonValue()', () => {
        let data = {},
            binding = { value: {} },
            key = '',
            result = '';

        // key doesn't exist check
        data = {};
        result = VueFetch.helpers.getJsonValue('message', data, binding)
        expect(result).toBeNull();

        // key exists, default
        data = {
            message: 'hello world'
        };
        result = VueFetch.helpers.getJsonValue('message', data, binding)
        expect(result).toBe('hello world');

        // use dot notation
        data = {
            message: {
                label: 'hello world'
            }
        };
        binding = {
            value: {
                'returnField': 'message.label'
            }
        }
        result = VueFetch.helpers.getJsonValue('', data, binding)
        expect(result).toBe('hello world');

        // test error on dot notation
        data = {
            message: {
                label: 'error'
            }
        };
        binding = {
            value: {
                'returnField': 'message.foo'
            }
        }
        result = VueFetch.helpers.getJsonValue('', data, binding)
        expect(result).toBeNull();
    })

    it('test getHttpMethod()', () => {
        let el = document.createElement('a'),
            result = '';

        // tests simple get
        result = VueFetch.helpers.getHttpMethod(el, { arg: 'get' });
        expect(result).toBe('get');

        // tests link with arg
        result = VueFetch.helpers.getHttpMethod(el, { arg: 'post' });
        expect(result).toBe('post');

        // tests form method
        el = document.createElement('form');
        el.setAttribute('method', 'delete');
        result = VueFetch.helpers.getHttpMethod(el, {});
        expect(result).toBe('delete');

        // tests form override method
        el = document.createElement('form');
        el.setAttribute('method', 'delete');
        result = VueFetch.helpers.getHttpMethod(el, { arg: 'put' });
        expect(result).toBe('put');
    })

    it('tests getUpdateModel()', () => {
        let result = '';

        result = VueFetch.helpers.getUpdateModel({});
        expect(result).toBeNull();

        result = VueFetch.helpers.getUpdateModel({'value': {}});
        expect(result).toBeNull();

        result = VueFetch.helpers.getUpdateModel({
            'value': {
                'updateModel': 'foo'
            }
        });
        expect(result).toBe('foo'); 
    })

    it('tests getSendModel()', () => {
        let result = '';

        result = VueFetch.helpers.getSendModel({});
        expect(result).toBeNull();

        result = VueFetch.helpers.getSendModel({'value': {}});
        expect(result).toBeNull();

        result = VueFetch.helpers.getSendModel({
            'value': {
                'sendModel': 'foo'
            }
        });
        expect(result).toBe('foo'); 
    })

    it('tests getFetchOpts()', () => {
        let result = '';

        result = VueFetch.helpers.getFetchOpts('put', {});
        expect(result).toMatchObject({ method: 'put', body: {} });

        result = VueFetch.helpers.getFetchOpts('put', null);
        expect(result).toMatchObject({ method: 'put', body: null });

        result = VueFetch.helpers.getFetchOpts('put', { 'foo': 'bar' } );
        expect(result).toMatchObject({ method: 'put', body: { 'foo': 'bar' } });
    })
});