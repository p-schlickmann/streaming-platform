import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'


import {editProfile, signInWithToken} from '../actions/actions'

const ProfileEdit = ({editProfile, userInfo, signInWithToken, history}) => {
    const [username, setUsername] = useState(false)
    const [email, setEmail] = useState(false)
    
    const [cookies] = useCookies(['token'])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!username || !email) return
        const formValues = {
            username,
            email,
        }
        console.log(formValues)
        editProfile(formValues, cookies.token, history)
    }

    const renderContent = () => {
        if (!cookies.token) {
            return (
                <Redirect to="/login" />
            )
        } else if(!userInfo && cookies.token) {
            signInWithToken(cookies.token)
        }else {
            if (username===false) {
                setUsername(userInfo.username)
            }
            if (email===false) {
                setEmail(userInfo.email)
            }
            return (
                <div style={{height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="ui middle aligned aligned grid" style={{width: '500px'}}>
                        <div className="column">
                            <h1 className="ui black image header">
                            <div className="content">
                                Edit Profile
                            </div>
                            </h1>
                                <div className="ui stacked segment">
                                    <br/>
                                    <form className='ui form' onSubmit={onSubmit}>
                                        <div className="field">
                                            <label>Username</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                        </div>
                                        <div className="field">
                                            <label>Email</label>
                                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                
                                        <button className="ui button primary">Change</button>
                                    </form> 
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

export default connect(mapStateToProps, {signInWithToken, editProfile})(ProfileEdit)
