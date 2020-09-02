import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import KEY from '../secrets'
import {signIn, signOut} from '../actions/actions'

const GoogleAuth = ({signIn, signOut, isSignedIn, userId}) => {

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: KEY,
                scope: 'email'
            }).then(() => {
                const auth = window.gapi.auth2.getAuthInstance()
                onAuthChange(auth.isSignedIn.get())
                auth.isSignedIn.listen(onAuthChange)
            })
        })
    }, [])

    

    const onAuthChange = (isSignedIn) => {
        const auth = window.gapi.auth2.getAuthInstance()
        isSignedIn ? signIn(auth.currentUser.get().getId()) : signOut()
    }

    const handleClick = () => {
        const auth = window.gapi.auth2.getAuthInstance()
        isSignedIn ? auth.signOut() : auth.signIn()
    }

    const renderAuthButton = () => {
        if (isSignedIn===null) {
            return null
        } else if (isSignedIn) {
            return (
            
                <button className="ui red google button" onClick={handleClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui red google button" onClick={handleClick}>
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    }

    return (
        <div>
            {renderAuthButton()}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn, userId: state.auth.userId}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)
