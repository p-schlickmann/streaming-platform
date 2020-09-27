import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'

import streams from '../api/streams'

const SignUp = () => {
    const [error, setError] = useState('')
    const [wasCreated, setCreateStatus] = useState(false)
    
    const signUp = user => {
        streams.post('create/', user)
        .then(res => {
            console.log(res)
            if (res.status===201){
                setCreateStatus(true)
            } 
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                const error = err.response.data
                if (error.email) {
                    setError(error.email[0])
                } else if (error.username) {
                    setError(error.username[0])
                } else if (error.password) {
                    setError("Ensure your password has at least 8 characters.")
                } else {
                    setError('An unknown internal server error occured.')
                }
            } else if (err.request) {
                setError('We couldn\'t complete your request. Check your network connection and try again.')
            } else {

            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (event.target.pw1.value !== event.target.pw2.value) {
            setError('Passwords should match.')
        } else {
            const userObject = {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.pw1.value
            }
            signUp(userObject)
        }
        
    }

    return (
        wasCreated
        ?<Redirect to="login"/>
        :<div>
            <br/>
                <h1 style={{textAlign: 'center'}}>Create Account</h1>
            <br/>
                <form className="ui form" onSubmit={handleSubmit} method='post'>
                    <div className="field">
                        <label>E-mail</label>
                        <input 
                        name="email"
                        type="text"
                        required
                        />
                    </div>
                    <div className="field">
                        <label>Username</label>
                        <input
                        name="username"
                        type="text"
                        required
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                        name="pw1"
                        type="password"
                        required
                        />
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input
                        name="pw2"
                        type="password"
                        required
                        />
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                            <input 
                            required 
                            type="checkbox"
                            id="check"
                            />
                            <label to="check">I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <br/>
                    <button className="ui button primary" type="submit">Submit</button>
                    <p style={{display: 'inline', color:'red'}}> {error}</p>
                </form>
        </div>
    )
}

export default SignUp
