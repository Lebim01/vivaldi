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

const check = (key, permissions, isSuperuser) => {
    return ( key ? !!permissions.find(p => p === key) : true ) || isSuperuser
}

function Permission({ key, mode, children }){
    
    const { permissions, isSuperuser } = useSelector(mapStateToProps)

    const available = check(key, permissions, isSuperuser)

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

export const checkPermission = (key) => {
    const { user_info } = store.getState()
    return check(key, user_info.permissions, user_info.isSuperuser )
}

export default Permission