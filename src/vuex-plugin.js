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

export default VueFetchModule