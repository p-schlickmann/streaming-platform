import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {signUp} from '../actions/actions'
import SignUp from './SignUp'


const SignUpForm = (props) => {

    const renderInput = (formProps) => {
        const hasError = formProps.meta.error && formProps.meta.touched

        if (formProps.type === 'checkbox') {
            return (
                <div className={`field ${hasError ? 'error' : ''}`}>
                    <div>
                        <label>{formProps.label}</label> 
                    </div>
                    <div>
                        {hasError ? 'This field is required.' : ''}
                    </div>
                </div>
            )
        }

        return (
            <div className={`field ${hasError ? 'error' : ''}`}>
                <div>
                    <label>{formProps.label}</label> 
                      
                    <input {...formProps.input}/>
                </div>
                <div>
                    {hasError ? 'This field is required.' : ''}
                </div>
            </div>
        )
    }

    return (
            <form class="ui form">

                    <Field 
                    name="email"
                    label="E-mail"
                    type="text"
                    component={renderInput}
                    />


                    <Field 
                    name="username"
                    label="Username"
                    type="Text"
                    component={renderInput}
                    />


                    <Field 
                    name="pw1"
                    label="Password"
                    type="password"
                    component={renderInput}
                    />

                    <Field 
                    name="pw2"
                    type="password"
                    label="Confirm Password"
                    component={renderInput}
                    />

                    <div class="ui checkbox">
                    <Field 
                    name="hasAccepted"
                    required
                    type="checkbox" 
                    tabindex="0" 
                    class="hidden"
                    label="I agree to the Terms and Conditions"
                    component={renderInput}
                    />
                    </div>
                <br/>
                <br/>
                <button class="ui button primary" type="submit">Submit</button>
            </form>
    )
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'You must enter a title'
    } if (!formValues.description) {
        errors.description = 'You must provide a description'
    }

    return errors
}


export default connect(null, {signUp})(
    reduxForm({
        form: 'signUp',
        validate: validate
    })(SignUpForm)
)
