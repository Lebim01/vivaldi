const baseurl = 'http://localhost:8000/api/v1'
const baseMediaUrl = 'http://localhost:8000'

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
    return `?${Object.keys(_obj).filter(key => _obj[key]).map((key) => `${key}=${_obj[key]}`).join('&')}`
}

export {
    baseurl,
    baseMediaUrl,
    getParameter,
    objectToUrl
}