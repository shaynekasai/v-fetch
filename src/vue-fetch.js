const helpers = {
    getEventType(el, binding) {
        if ('eventType' in binding.value) {
            return binding.value.eventType;
        }

        if (el.nodeName === 'FORM') {
            return 'submit';
        }

        return 'click';
    },
    getUrl(el, binding) {
        if ('url' in binding.value) {
            return binding.value.url;
        }
        if (el.nodeName === 'FORM' && el.getAttribute('action')) {
            return el.getAttribute('action');
        }   
    },
    getMethod(el, binding) {
        if (~['get', 'post', 'put', 'patch', 'delete'].indexOf(binding.arg)) {
            return binding.arg;
        }

        if ('method' in binding.value) {
            return binding.value.method;
        }

        if (el.getAttribute('method')) {
            return el.getAttribute('method');
        }
    },
    getModel(binding) {
        if ('model' in binding.value) {
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
                method = helpers.getMethod(el, binding),
                eventType = helpers.getEventType(el, binding);

            handle()

            function handle() {
                let opts = {
                    model,
                    url,
                    method,
                    eventType
                };

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
                            vnode.context.$emit('v-fetch:complete', opts)
                        }).catch((error) => {
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