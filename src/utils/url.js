import { config } from '../config';
import axios from 'axios'

const baseurl = config.baseurl
const baseMediaUrl = config.baseMediaUrl
const einoviceUrl = config.einoviceUrl

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

async function getResults(url, no_page = false, headers = {}){
    try {
        let _url = new URL(url)
        if(no_page){
            // set page_size = 0
            let page_size = _url.searchParams.get('page_size')
            if(page_size === null){
                _url.searchParams.append('page_size', 0)
            }
        }

        const { data } = await axios.get(_url.toString(), headers)
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

function downloadFile(url){
    if (url){
        let file_path = baseMediaUrl + url;
        let a = document.createElement('A');
        a.target = '_blank';
        a.download = true;
        a.href = file_path;
        a.click()
    }
}

function canDownload(url){
    if(url && url.includes('none')){
        return true
    }
    return false
}

export {
    baseurl,
    baseMediaUrl,
    einoviceUrl,
    getParameter,
    objectToUrl,
    getResults,
    downloadFile,
    canDownload
}
