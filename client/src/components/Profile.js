import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'

import Modal from './Modal'
import {signOut, signInWithToken, deleteProfile} from './../actions/actions'

const Profile = ({signOut, signInWithToken, userInfo, deleteProfile}) => {
    const [gotLoggedOut, setLogoutStatus] = useState(false)
    const [cookies, setCookies] = useCookies(['token'])
    const [displayModal, setModal] = useState(false)

    const onLogOut = () => {
        const veryLongTime = new Date()
        const today = new Date()
        veryLongTime.setDate(today.getDate()+999999999999999)
        setCookies('token', '', { path: '/', expires: veryLongTime})
        signOut()
        setLogoutStatus(true)
    }

    const onDelete = () => {
        onLogOut()
        deleteProfile(cookies.token)
        setModal(false)
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
        } else if(!userInfo && cookies.token) {
            signInWithToken(cookies.token)
        } else {
            return (
                <div>
                    
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
                                        <h2>{userInfo.username}</h2>
                                        <h3>{userInfo.email}</h3>
                                    </div>
                                    <br />
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} > 
                                        <Link to="/" className="ui  large button inverted secondary">
                                            <i className="home icon"></i>
                                            Home
                                            </Link>  
                                        <Link to="/profile/edit" className="ui large button inverted secondary" >
                                            <i className="user icon"></i>
                                            Edit Profile</Link>
                                        <button className="ui large button inverted secondary" onClick={onLogOut}>
                                            <i className="sign-out icon"></i>
                                            Log out</button>
                                    </div>
                                    <br/>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <button onClick={()=>setModal(true)} className="ui  large button inverted red">
                                            <i className="delete icon"></i>
                                            Delete Account</button>
                                        {displayModal ? <Modal setModal={setModal} onEnd={onDelete} title="Delete Account" message="This action will delete you account forever and it cannot be undone."/>: null}
                                        <Link to="/profile/changepassword" className="ui  large button inverted secondary" >
                                            <i className="lock icon"></i>
                                            Change Password</Link>
                                    </div>  
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


export default connect(mapStateToProps, {signOut, signInWithToken, deleteProfile})(Profile)
