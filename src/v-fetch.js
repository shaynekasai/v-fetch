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
    getModel(binding) {
        if (binding.value && 'model' in binding.value) {
            return binding.value.model;
        }

        return;
    }
};

const fetchDirective = function (options = {}) {
    return {
        bind(el, binding, vnode) {
            let model = helpers.getModel(binding),
                url = helpers.getUrl(el, binding),
                method = helpers.getHttpMethod(el, binding),
                eventType = helpers.getEventType(el, binding);

            handle()

            function handle() {
                let opts = {
                    model,
                    url,
                    method,
                    eventType
                };

                if (binding.value && 'onStart' in binding.value) {
                    vnode.context[binding.value.onStart]();
                }

                vnode.context.$emit('v-fetch:start', opts)

                el.addEventListener(eventType, function (e) {
                    fetch(url, {
                        method
                    })
                        .then(response => response.json())
                        .then(function (data) {
                            if (model) {
                                vnode.context[model] = data;
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