import VueFetchModule from './vuex-plugin.js';
import helpers from './helpers.js';

const fetchDirective = function (options = {}) {

    if ('vuexStoreConfig' in options) {
        if (!options.vuexStoreConfig.modules) {
            options.vuexStoreConfig.modules = {};
        }
        options.vuexStoreConfig.modules = {
            'vfetch': VueFetchModule
        };
    }

    return {
        bind(el, binding, vnode) {
            let updateModel = helpers.getUpdateModel(binding),
                sendModel = helpers.getSendModel(binding),
                url = helpers.getUrl(el, binding),
                method = helpers.getHttpMethod(el, binding),
                eventType = helpers.getEventType(el, binding),
                body = '';

            // TODO: extract
            if (sendModel) {
                body = helpers.getBody(vnode.context[sendModel], binding)
            } else if (el.nodeName === 'FORM') {
                body = helpers.getBody(helpers.formDataToObject(new FormData(el)), binding)
            }
            
            handle()

            function handle() {
                let opts = {
                    binding,
                    updateModel,
                    sendModel,
                    url,
                    method,
                    eventType,
                    body
                };                

                el.addEventListener(eventType, (e) => {
                    // Trigger standard Vue
                    if (binding.value && 'onStart' in binding.value) {
                        vnode.context[binding.value.onStart](opts);
                    }
                    vnode.context.$emit('v-fetch:start', opts)

                    fetch(url, helpers.getFetchOpts(method, body))
                        .then(response => response.json())
                        .then(function (data) {
                            opts.data = data;

                            // vuejs model update
                            if (!vnode.context.$store && updateModel) {
                                vnode.context[updateModel] = helpers.getJsonValue(updateModel, data, binding);
                            }
                            
                            // vuex update
                            if ('$store' in vnode.context) {
                                vnode.context.$store.commit('_vfetchUpdate', opts);
                            }

                            // callbacks
                            if (binding.value && 'onComplete' in binding.value) {
                                vnode.context[binding.value.onComplete](opts);
                            }

                            // event triggers
                            vnode.context.$emit('v-fetch:complete', opts)
                        }).catch((error) => {
                            if (binding.value && 'onError' in binding.value) {
                                vnode.context[binding.value.onError](opts);
                            }
                            vnode.context.$emit('v-fetch:error', opts)
                            throw error;
                        });
                });
            }
        }
    }
}

const VueFetch = {
    install(Vue, options = {}) {
        Vue.directive('fetch', fetchDirective(options))
    },
    directive: fetchDirective(),
    helpers
};
export default VueFetch

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueFetch);
    window.VueFetch = VueFetch;
}