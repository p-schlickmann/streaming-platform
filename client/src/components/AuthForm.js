import React from 'react'
import {connect} from 'react-redux'

import {signIn} from '../actions/actions'

const AuthForm = ({signIn}) => {
    const onSubmit = (event) => {
        event.preventDefault()
        const u = event.target.email_or_username.value 
        const pw = event.target.password.value
        const formValues = {
            email_or_username: u,
            password: pw
        }
        signIn(formValues)
    }
    return (
        <form className="ui large form error" onSubmit={onSubmit}>
            <div className='field'>
                <div className="ui left icon input">
                    <i className='user icon'></i>
                    <input type='text' name='email_or_username' placeholder='Username or E-mail' autoComplete='off'/>
                </div>
            </div>
            <div className='field'>
                <div className="ui left icon input">
                    <i className='lock icon'></i>
                    <input type='password' name='password' placeholder='Password' autoComplete='off'/>
                </div>
            </div>
            <button type='submit' className="ui fluid large button primary">Login</button>
        </form>
    )
}


export default connect(null, {signIn})(AuthForm)

