import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'

import {signOut, signInWithToken} from './../actions/actions'

const Profile = props => {
    const [gotLoggedOut, setLogoutStatus] = useState(false)
    const [cookies, setCookies] = useCookies(['token'])

    const onButtonClick = () => {
        setCookies('token', '')
        props.signOut()
        setLogoutStatus(true)
    }

    const renderContent = () => {
        if (gotLoggedOut) {
            return (
                <Redirect to="/" />
            )
        }
        else if (!cookies.token) {
            return (
                <Redirect to="/login" />
            )
        } else if(!props.userInfo && cookies.token) {
            console.log('got user info')
            props.signInWithToken(cookies.token)
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
                            <button className="ui fluid large button" onClick={() => ''}>Edit Profile</button>
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
