import axios from 'axios'
import store from './../store/auth'

function post(url, data, headers = true){
    if(headers){
        let { token } = store.getState()
        return axios.post(url, data, { header : { Authorization : `JWT ${token}` } })
    }else{
        return axios.post
    }
}

function get(url, data, headers = true){
    if(headers){
        let { token } = store.getState()
        return axios.get(url, data, { header : { Authorization : `JWT ${token}` } })
    }else{
        return axios.get
    }
}

function put(url, data, headers = true){
    if(headers){
        let { token } = store.getState()
        return axios.put(url, data, { header : { Authorization : `JWT ${token}` } })
    }else{
        return axios.put
    }
}

export default { post, get, put }