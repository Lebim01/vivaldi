import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'
import { baseurl } from './../utils/url'

const persistConfig = {
    key: 'root',
    storage
}

const initialState = {
    loading : false,
    auth : false,
    token : ''
};

function reducer(state = initialState, action) {
    if(state.token && !axios.defaults.headers.common['Authorization']){
        axios.defaults.headers.common['Authorization'] = `JWT ${state.token}`
    }
    switch(action.type) {
        case 'LOGIN':
            axios.defaults.headers.common['Authorization'] = `JWT ${action.token}`
            return {
                ...state,
                auth: true,
                token: action.token
            }
        case 'LOGOUT':
            return initialState
        case 'AUTH-SUCCECSS':
            axios.defaults.headers.common['Authorization'] = `JWT ${state.token}`
            return {
                ...state,
                auth: true
            }
        case 'AUTH-FAILURE':
            return {
                ...state,
                auth: false,
                token: ''
            }
        case 'AUTH-MAKE':
            axios.post(`${baseurl}/token-verify/`, { token : state.token })
            .then(() => {
                store.dispatch({
                    type: 'AUTH-SUCCECSS'
                })
            })
            .catch(() => {
                store.dispatch({
                    type : 'AUTH-FAILURE'
                })
            })
            break
        default:
            break
    }
    return state
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)
export { store, persistor }
export default store