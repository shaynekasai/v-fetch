const helpers = {
    getEventType(el, binding) {
        if (binding.value && 'eventType' in binding.value) {
            return binding.value.eventType;
        }

        if (el.nodeName === 'FORM') {
            return 'submit';
        }

        return 'click';
    },
    getUrl(el, binding) {
        if (binding.value && 'url' in binding.value) {
            return binding.value.url;
        }
        if (el.nodeName === 'FORM' && el.getAttribute('action')) {
            return el.getAttribute('action');
        }   
        if (el.nodeName === 'A' && el.getAttribute('href')) {
            return el.getAttribute('href');
        }  
    },
    getHttpMethod(el, binding) {
        if ('arg' in binding && ~['get', 'post', 'put', 'patch', 'delete'].indexOf(binding.arg)) {
            return binding.arg;
        }

        if (binding.value && 'method' in binding.value) {
            return binding.value.method;
        }

        if (el.getAttribute('method')) {
            return el.getAttribute('method');
        }

        return 'get';
    },
    getUpdateModel(binding) {
        if (binding.value && 'updateModel' in binding.value) {
            return binding.value.updateModel;
        }

        return null;
    },
    getSendModel(binding) {
        if (binding.value && 'sendModel' in binding.value) {
            
            return binding.value.sendModel;
        }

        return null;
    },
    getBody(sendModelData, binding) {
        if (!sendModelData) {
            return null;
        }
        
        // mainly catch default (eg. no sendAs parameter, or explicite json is passed in)
        if (!binding.hasOwnProperty('value') || !binding.value.hasOwnProperty('sendAs') || binding.value.sendAs == 'json') {
            return JSON.stringify(sendModelData);
        }

        // default: form style
        let formData = new FormData();
        for ( var key in sendModelData ) {
            formData.append(key, sendModelData[key]);
        }

        return formData;
    },

    formDataToObject(formData) {
        let obj = {};
       
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        
        return obj;
    },

    getFetchOpts(method, body) {
        if (~['get', 'head'].indexOf(method)) {
            return { method };
        }

        return { method, body }
    },

    getJsonValue(key, data, binding) {
        if (binding.value && 'returnField' in binding.value) {
            return binding.value.returnField.split('.').reduce((o,i)=>o[i], data) || null;
        }

        if (key in data) {
            return data[key];
        }

        return null;
    },

    fetch() {

    }
};


const VueFetchModule = {
    mutations: { 
        _vfetchUpdate({ commit, state }, opts) {
            if ('updateModel' in opts) {
                this.state[opts.updateModel] = opts.data;
            }
        }
    },
    actions: {

    },
}

const fetchDirective = function (options = {}) {

    if ('vuexStore' in options) {
        if (!options.vuexStore.modules) {
            options.vuexStore.modules = {};
        }
        options.vuexStore.modules = {
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