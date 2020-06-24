import Swal from 'sweetalert2'
import axios from 'axios'
import { baseurl, objectToUrl } from 'utils/url'

const confirmarDefault = {
    text: '¿Seguro de guardar?',
    params : {},
    id: null,
    showResponse : false,
    method: 'post'
}

async function confirmEndpoint(options){

    const _options = {
        ...confirmarDefault,
        ...options
    }

    const getTabs = (t) => {
        let spaces = ''
        for(let i = 0; i < t; i++){
            spaces += '&emsp;';
        }
        return spaces
    }

    const getValueResponse = (value, t = 0) => {
        if(Array.isArray(value)){
            return value
                .map((row, index) => {
                    if(typeof row === 'object'){
                        if(Object.keys(row).length === 0) return null
                        return `
                            <br/>
                            ${getTabs(t)}#${index}
                            ${getValueResponse(row, t+1)}
                        `
                    }else{
                        return row
                    }
                })
                .join('')
        }
        else if(typeof value === 'object') {
            let keys = Object.keys(value)
            return keys.map((key) => `
                <br />
                ${getTabs(t)}${key} : ${getValueResponse(value[key], t+1)}
            `)
            .join('')
        }else{
            return value
        }
    }

    const formatErrorResponse = (response) => {
        if(typeof response.data === 'object'){
            let keys = Object.keys(response.data)
            let response_string = keys.map((key) =>
                `${key} : ${getValueResponse(response.data[key])}<br>`
            ).join('')
            return response_string
        }
        return null
    }

    let result = await Swal.fire({
        title: 'Confirmar',
        text : _options.text,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            return axios[_options.method](`${baseurl}/${_options.endpoint}/${_options.id ? `${_options.id}/` : ``}${_options.params_get ? `${objectToUrl(_options.params_get)}` : ''}`, _options.params)
            .then(response => {
                if (response.status >= 400 && response.status < 500){
                    // SHOW eg. {'tarifa_tasa' : ['A valid number is required.'] }                    
                    throw formatErrorResponse(response)
                }

                else if (response.status < 200 || response.status >= 500) {
                    throw new Error(response.statusText)
                }

                return response
            })
            .catch(response => {
                if(response.status >= 400 && response.status < 500){
                    Swal.showValidationMessage(response.response.data)
                }
                else {
                    Swal.showValidationMessage(
                        ` ${response.response.data}`
                    )
                }
            })
            .catch(error => {
                if(error.response.status >= 400 && error.response.status < 500){
                    Swal.showValidationMessage(formatErrorResponse(error.response))
                }
                else {
                    Swal.showValidationMessage(
                        `Petición fallida: ${error}`
                    )
                }
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
    })

    if (result.value) {
        return _options.getValue ? result.value : true
    }
    return false
}

export {
    confirmEndpoint
}