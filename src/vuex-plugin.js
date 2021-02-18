import helpers from './helpers.js';

const VueFetchModule = {
    mutations: { 
        _vfetchUpdate({ commit, state }, opts) {
            if ('updateModel' in opts) {
                if (!opts.updateModel in this.state) {
                    return;
                }
                this.state[opts.updateModel] = helpers.getJsonValue(opts.updateModel, opts.data, opts.binding);
            }
        }
    }
}

export default VueFetchModule