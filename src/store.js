import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            documento: null,
            page: null,
            ratio: null
        }
    },
    mutations: {
        setDocumento(state, doc) {
            state.documento = doc
        },
        setPage(state, p) {
            state.page = p
        },
        setRatio(state,r){
            state.ratio = r
        }
    }
})