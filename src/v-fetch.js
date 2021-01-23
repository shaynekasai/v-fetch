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
        if (~['get', 'post', 'put', 'patch', 'delete'].indexOf(binding.arg)) {
            return binding.arg;
        }

        if (binding.value && 'method' in binding.value) {
            return binding.value.method;
        }

        if (el.getAttribute('method')) {
            return el.getAttribute('method');
        }
    },
    getUpdateModel(binding) {
        if (binding.value && 'updateModel' in binding.value) {
            return binding.value.updateModel;
        }

        return;
    },
    getSendModel(binding) {
        if (binding.value && 'sendModel' in binding.value) {
            return binding.value.sendModel;
        }

        return;
    },
    getBody(sendModelData, binding) {
        if (!sendModelData) {
            return null;
        }

        if (!binding.value || !binding.value.sendAs) {
            return null;
        }

        // sends as json content, would need to be encoded on the other end
        if (binding.value.sendAs == 'json') {
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
    }
};

const fetchDirective = function (options = {}) {
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

                if (binding.value && 'onStart' in binding.value) {
                    vnode.context[binding.value.onStart]();
                }

                vnode.context.$emit('v-fetch:start', opts)

                el.addEventListener(eventType, function (e) {
                    fetch(url, {
                        method,
                        body
                    })
                        .then(response => response.json())
                        .then(function (data) {
                            if (updateModel) {
                                vnode.context[updateModel] = data;
                            }

                            if (binding.value && 'onComplete' in binding.value) {
                                vnode.context[binding.value.onComplete]();
                            }
                            vnode.context.$emit('v-fetch:complete', opts)
                        }).catch((error) => {
                            if (binding.value && 'onError' in binding.value) {
                                vnode.context[binding.value.onError]();
                            }
                            vnode.context.$emit('v-fetch:error', opts)
                            throw error;
                        });
                });
            }
        }
    }
}

const plugin = {
    install(Vue, options = {}) {
        Vue.directive('fetch', fetchDirective(options))
    },
    directive: fetchDirective(),
    helpers
};
export default plugin