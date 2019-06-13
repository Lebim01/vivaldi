import { createStore } from 'redux';
const initialState = {
    loading : false,
    auth : false,
    token : ''
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                login : true
            }
    }
    return state
}

const store = createStore(reducer, initialState);
export default store;