import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {signIn, signOut} from '../actions/actions'

const Auth = () => {

    return (
        <div>
        <button className="ui red google button">
            <i className="user icon" />
            Sign In
        </button>
        </div>
    )
}

export default Auth
