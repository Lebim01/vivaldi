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

function getAllParameters () {
	// initialize an empty object
    let result = {};

    // get URL query string
    let params = window.location.href;

    if(window.location.href.indexOf('?') === -1)
        return {}

    // remove the '?' character
    params = params.substr(window.location.href.indexOf('?')+1, window.location.href.length);

    let queryParamArray = params.split('&');

    // iterate over parameter array
    queryParamArray.forEach(function(queryParam) {
      // split the query parameter over '='
      let item = queryParam.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    Object.keys(result).map(key => {
        if(!key) delete result[key]
        else if(!result[key]) delete result[key]
    })

    // return result object
    return result;
};

function objectToUrl(_obj){
    return `?${Object.keys(_obj).filter(key => _obj[key] !== undefined && _obj[key] !== null && _obj[key] !== '').map((key) => `${key}=${_obj[key]}`).join('&')}`
}

async function getResults(url, no_page = false, headers = {}, force_full = false){
    try {
        let _url = new URL(url)
        if(no_page){
            // set page_size = 0
            let page_size = _url.searchParams.get('page_size')
            if(page_size === null){
                _url.searchParams.append('page_size', 0)
            }

            // no paginated request is stripped unless full is forced
            if (!page_size && !force_full && !_url.searchParams.get('type')) {
                _url.searchParams.append('type', 'select')
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
    canDownload,
    getAllParameters
}
