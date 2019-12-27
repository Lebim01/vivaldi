import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import store from 'store/auth'

const modes = {
    HIDDEN : 'hidden',
    REDIRECT : 'redirect'
}

const mapStateToProps = ({ user_info }) => {
    return {
        isSuperuser : user_info.isSuperuser,
        permissions : user_info.permissions
    }
}

const check = (key_permission, permissions, isSuperuser) => {
    if(key_permission === 'change_frecuencia')
        console.log(
            ( key_permission ? !!(permissions || []).find(p => p === key_permission) : true )  || isSuperuser
        )
    return ( key_permission ? !!(permissions || []).find(p => p === key_permission) : true )  || isSuperuser
}

function Permission({ key_permission, mode, children }){
    
    const { permissions, isSuperuser } = useSelector(mapStateToProps)

    const available = check(key_permission, permissions, isSuperuser)

    return (
        <>
            { available 
                ? children
                : mode === modes.HIDDEN
                    ? null
                    : <Redirect to="/401" />
            }
        </>
    )
}

Permission.propTypes = {
    redirect : PropTypes.bool,
    mode : PropTypes.oneOf([ modes.HIDDEN, modes.REDIRECT ])
}

Permission.defaultProps = {
    redirect : false,
    mode : 'hidden'
}

export const checkPermission = (key_permission) => {
    const { user_info } = store.getState()

    let _check = check(key_permission, user_info.permissions, user_info.isSuperuser )

    return _check
}

export const isSet = (key_permission) => {
    const { user_info } = store.getState()
    
    return user_info.permissions.includes(key_permission)
}

export default Permission