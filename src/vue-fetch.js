const helpers = {
    getEventType(el, binding) {
        if ('eventType' in binding.value) {
            return binding.value.eventType;
        }

        if (el.nodeName === 'FORM') {
            return 'change';
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
    }
};

const fetchDirective = function (options = {}) {
    return {
        bind(el, binding, vnode) {
            let model = binding.value.model;
            let self = this;
            let url = helpers.getUrl(el, binding);
            let method = helpers.getMethod(el, binding);
            let eventType = helpers.getEventType(el, binding);


            // if (el.nodeName === 'A') {
            //     bindLink();
            // } else if (el.nodeName === 'FORM') {
            //     bindForm();
            // }


            // function bindForm() {
            //     el.addEventListener('submit', function (e) {
            //         let url = el.getAttribute('action');
            //         let method = el.getAttribute('method');
            //         e.preventDefault();

            //         fetch(url, {
            //             'method': getMethod()
            //         })
            //             .then(response => response.json())
            //             .then(function (data) {
      
            //                 vnode.context[model] = data;
            //             }).catch((error) => {
            //                 console.log(error)
            //             });

        
            //     });
            // }

            // function bindLink() {
            //     el.addEventListener('click', function () {
            //         let url = el.getAttribute('href');
            //         fetch(url, {
            //             'method': getMethod()
            //         })
            //             .then(response => response.json())
            //             .then(function (data) {
            //                 vnode.context[model] = data;
            //             }).catch((error) => {
            //                 console.log(error)
            //             });
            //     });
            // }





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