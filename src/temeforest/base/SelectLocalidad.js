
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { baseurl } from 'utils/url'
import { Select } from 'temeforest'

function SelectLocalidad({ value, userLocalidad, ...props }){

    useEffect(() => {
        props.onChange({
            target : {
                value : userLocalidad
            }
        })
    }, [ userLocalidad ])

    const options = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    return (
        <Select 
            asyncOptions={options} 
            value={userLocalidad ? userLocalidad : value} 
            disabled={!!userLocalidad}
            {...props} 
        />
    )
}

const mapStateToProps = (state) => ({
    userLocalidad : state.user_info.localidad
})

export default connect(mapStateToProps)(SelectLocalidad)