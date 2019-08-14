import { config } from '../config';
import axios from 'axios'

const baseurl = config.baseurl
const baseMediaUrl = config.baseMediaUrl

function getParameter(_name){
    let url_string = window.location.href
    let parameters = url_string.split('?')[1]
    if(parameters){
        parameters = parameters.split('&')
        for(let i in parameters){
            const [ name, value ] = parameters[i].split('=')
            if(name === _name){
                return value
            }
        }
    }
    return null
}

function objectToUrl(_obj){
    return `?${Object.keys(_obj).filter(key => _obj[key] !== undefined && _obj[key] !== null && _obj[key] !== '').map((key) => `${key}=${_obj[key]}`).join('&')}`
}

async function getResults(url){
    try {
        const { data } = await axios.get(url)
        if(Array.isArray(data))
            return data
        else if(data.results)
            return data.results
        else
            return []
    }
    catch(e){
        return []
    }
}

export {
    baseurl,
    baseMediaUrl,
    getParameter,
    objectToUrl,
    getResults
}
