import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {signOut, signInWithToken} from './../actions/actions'
import deleteCookie from './../utils/deleteCookie'
import getCookie from './../utils/getCookie'

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
        } else if(!props.userInfo && getCookie('token')) {
            console.log('saved')
            props.signInWithToken(getCookie('token'))
        } else {
            return (
                <div style={{height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center',}}>
            <div className="ui middle aligned center aligned grid" style={{width: '550px'}}>
            <div className="column">
                <h1 className="ui black image header">
                <div className="content">
                    Your Profile
                </div>
                </h1>
                
                    <div className="ui stacked segment">
                        <div>
                            <h2>{props.userInfo.username}</h2>
                            <h3>{props.userInfo.email}</h3>
                        </div>
                        <br />
                        <div  style={{display:'flex', alignItems:'center'}} >   
                            <button className="ui fluid large button" onClick={onButtonClick}>Edit Profile</button>
                            <button  className="ui fluid large button primary" onClick={onButtonClick}>Log out</button>
                        </div>  
                    </div>
            </div>
            </div>
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

const mapStateToProps = state => {
    return {userInfo: state.auth.userInfo}
}


export default connect(mapStateToProps, {signOut, signInWithToken})(Profile)
