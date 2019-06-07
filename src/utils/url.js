const baseurl = 'http://localhost:8000/base/api/v1'

function getParameter(_name){
    let url_string = window.location.href
    let parameters = url_string.split('?')[1].split('&')
    for(let i in parameters){
        const [ name, value ] = parameters[i].split('=')
        if(name === _name){
            return value
        }
    }
    return null
}

export {
    baseurl,
    getParameter
}