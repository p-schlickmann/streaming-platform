import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import {signIn} from '../actions/actions'

const AuthForm = (props) => {
    const renderInput = (formProps) => {
        const hasError = formProps.meta.error && formProps.meta.touched
        return (
            <div className={`field ${hasError ? 'error' : ''}`}>
                <div className="ui left icon input">
                    <i className={`${formProps.icon} icon`}></i>
                    <input {...formProps} {...formProps.input} autoComplete='off'/>
                </div>
                <div>
                    <p>{hasError ? 'This field is required.' : ''}</p>
                </div>
            </div>
        )
    } 

    const onSubmit = (formValues) => {
        props.signIn(formValues)
    }
    return (
        <form className="ui large form error" onSubmit={props.handleSubmit(onSubmit)}>
            <Field type='text' icon='user' name='email_or_username' placeholder='Username or E-mail' component={renderInput}/>
            <Field type='password' icon='lock' name='password' placeholder='Password' component={renderInput}/>
            <button className="ui fluid large button primary">Login</button>
        </form>
    )
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.username) {
        errors.username = 'You must enter a username'
    } if (!formValues.password) {
        errors.password = 'You must provide a password'
    }

    return errors
}

export default connect(null, {signIn})(
    reduxForm({
        form: 'authForm',
        validate: validate
    })(AuthForm)
)

