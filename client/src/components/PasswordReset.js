import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useCookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'


import {editProfile, signInWithToken} from '../actions/actions'

const PasswordReset = ({editProfile, userInfo, signInWithToken, history}) => {
    const [pw1, setPw1] = useState('')
    const [pw2, setPw2] = useState('')
    
    const [cookies] = useCookies(['token'])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!pw1 || !pw2) return
        if (pw1 !== pw2) return
        const formValues = {
            password: pw1
        }

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
            
            return (
                <div style={{height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="ui middle aligned aligned grid" style={{width: '500px'}}>
                        <div className="column">
                            <h1 className="ui black image header">
                            <div className="content">
                                Change Your Password
                            </div>
                            </h1>
                                <div className="ui stacked segment">
                                    <br/>
                                    <form className='ui form' onSubmit={onSubmit}>
                                        <div className="field">
                                            <label>New Password</label>
                                            <input type="password" value={pw1} onChange={(e) => setPw1(e.target.value)}/>
                                        </div>
                                        <div className="field">
                                            <label>Confirm New Password</label>
                                            <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
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

export default connect(mapStateToProps, {signInWithToken, editProfile})(PasswordReset)
