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

    }
};

const fetchDirective = function (options = {}) {
    return {
        bind(el, binding, vnode) {
            let model = binding.value.model;
            let url = helpers.getUrl(el, binding);
            let method = helpers.getMethod(el, binding);
            let eventType = helpers.getEventType(el, binding);

            console.log(url, method, eventType)
            handle()

            function handle() {
                el.addEventListener(eventType, function (e) {
                    fetch(url, {
                        method
                    })
                        .then(response => response.json())
                        .then(function (data) {
                            vnode.context[model] = data;
                        }).catch((error) => {
                            console.log(error)
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