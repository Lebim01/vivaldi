import Swal from 'sweetalert2'
import axios from 'axios'
import { baseurl } from 'utils/url'

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

    const getValueResponse = (value) => {
        if(typeof value === 'string') return value
        else if(typeof value === 'object') {
            let keys = Object.keys(value)
            return keys.map((key) => `${key} : ${value[key].toString()}<br>`).join('')
        }
        else if(Array.isArray(value)){
            return value.join('<br>')
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
        preConfirm: () => {
            return axios[_options.method](`${baseurl}/${_options.endpoint}/${_options.id ? `${_options.id}/` : ``}`, _options.params)
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
        return true
    }
    return false
}

export {
    confirmEndpoint
}