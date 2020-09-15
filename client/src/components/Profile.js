import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {signOut} from './../actions/actions'
import deleteCookie from './../utils/deleteCookie'
import getCookie from '../utils/getCookie'

const Profile = props => {
    const [gotLoggedOut, setLogoutStatus] = useState(false)

    const onButtonClick = () => {
        deleteCookie('token')
        props.signOut()
        setLogoutStatus(true)
    }

    const renderContent = () => {
        if (gotLoggedOut) {
            return (
                <Redirect to="/" />
            )
        }
        else if (!getCookie('token')) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div>   
                    <button onClick={onButtonClick}>Log out</button>
                </div>
            )
            
        }
    }
    
    return (
        <div>
            {renderContent()}
        </div>
    )
}


export default connect(null, {signOut})(Profile)
