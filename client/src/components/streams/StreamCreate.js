import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import {createStream} from '../../actions/actions'


const StreamCreate = (props) => {

    const renderInput = formProps => {
        const hasError = formProps.meta.error && formProps.meta.touched ? true : false
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

    const onSubmit = (formValues) => {
        console.log(formValues)
        props.createStream(formValues)
    }

    return (
        <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
            <Field name="title" label="Enter Title" component={renderInput}/>
            <Field name="description" label="Enter Description" component={renderInput}/>
            <button className="ui button primary">Submit</button>
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

export default connect(null, {createStream})(
    reduxForm({
        form: 'streamCreate',
        validate: validate
    })(StreamCreate)
)

