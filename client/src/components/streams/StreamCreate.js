import React, { useEffect } from 'react'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {createStream, getCategories} from '../../actions/actions'
import getCookie from '../../utils/getCookie'

const StreamCreate = (props) => {

    useEffect(()=>{
        props.getCategories()
    }, [])

    var token = getCookie('token')
    console.log(!!token)

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

    const renderDropdown = () => {
        return props.categories.map(cat => {
            return (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            )
        })
    }

    const onSubmit = (formValues) => {
        formValues.token = token
        console.log(formValues)
        props.createStream(formValues)
    }

    return (
        token
        ?<form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
            <Field name="title" label="Enter Title" component={renderInput}/>
            <div>
                <label>Pick a category</label>
                <div>
                    <Field name="category" component="select">
                        <option></option>
                        {renderDropdown()}
                    </Field>
                </div>
             </div>
             <br/>
            <button className="ui button primary">Submit</button>
        </form> 
        
        :<Redirect to="/login"/>
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

const mapStateToProps = state => {
    return {categories: state.categories}
}

export default connect(mapStateToProps, {createStream, getCategories})(
    reduxForm({
        form: 'streamCreate',
        validate: validate
    })(StreamCreate)
)

