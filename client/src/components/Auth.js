import React from 'react'
import {Link} from 'react-router-dom'

import AuthForm from './AuthForm'


const Auth = () => {
    return (
        <div style={{height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center',}}>
            <div className="ui middle aligned center aligned grid" style={{width: '550px'}}>
            <div className="column">
                <h2 className="ui black image header">
                <div className="content">
                    Log-in to your account
                </div>
                </h2>
                
                    <div className="ui stacked segment">
                        <AuthForm/>
                    </div>
                

                <div className="ui message"> New to us? <Link to='/signup'>Sign up</Link>
                </div>
            </div>
            </div>
        </div>
            
    )
}

export default Auth
