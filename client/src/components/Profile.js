import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import deleteCookie from './../utils/deleteCookie'

const Profile = () => {
    const [isLoggedOut, setLogout] = useState(false)

    const onButtonClick = () => {
        deleteCookie('token')
        setLogout(true)
    }

    return (
        isLoggedOut
        ? <Redirect to="/" />
        :<div>
            <button onClick={onButtonClick}>Log out</button>
        </div>
    )
}

export default Profile
