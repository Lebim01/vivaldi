import Swal from 'sweetalert2'
import axios from 'axios'
import { baseurl } from 'utils/url'

const confirmarDefault = {
    text: '¿Seguro de guardar?',
    params : {},
    id: null
}

async function confirmEndpoint(options){

    const _options = {
        ...confirmarDefault,
        ...options
    }
    console.log(_options)

    let result = await Swal.fire({
        title: 'Confirmar',
        text : _options.text,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return axios.post(`${baseurl}/${_options.endpoint}/${_options.id ? `${_options.id}/` : ``}`, _options.params)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText)
                }
                return response
            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Petición fallida: ${error}`
                )
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