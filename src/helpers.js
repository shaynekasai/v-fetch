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
    }
};

export default helpers