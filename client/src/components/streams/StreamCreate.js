import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import {getCategories} from '../../actions/actions'
import streams from '../../api/streams'

const StreamCreate = (props) => {
    const [message, setMessage] = useState('')
    const [cookies, setCookies] = useCookies(['token'])

    useEffect(()=>{
        props.getCategories()
    }, [])

    const renderDropdown = () => {
        return props.categories.map(cat => {
            return (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            )
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const formValues = {
            token: cookies.token,
            category: event.target.category.value,
            title: event.target.title.value
        }
        streams.post('newstream/', formValues, {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        })
        .then(res => {
            if (res.status==201) {
                setMessage('Stream Created Successfully!')
            }
        })
        .catch(err => {
            console.log(err.response)
            if (err.response) {
                setMessage(err.response.data)
            } else if (err.request) {
                setMessage('We couldn\'t complete your request. Check your network connection and try again.')
            }
        })
    }

    return (
        cookies.token
        ?<form className="ui form" onSubmit={onSubmit}>
            <div className="field">
                <label>Enter Stream Title</label>
                <input type="text" name="title"/>
            </div>
            <div className="field">
                <label>Pick a category</label>
                <select name="category">
                    <option></option>
                    {renderDropdown()}
                </select>
             </div>
             <br/>
            <button className="ui button primary">Submit</button>
            <p style={{display: 'inline'}}>{message}</p>
        </form> 
        :<Redirect to="/login"/>
    )
}



const mapStateToProps = state => {
    return {categories: state.categories}
}

export default connect(mapStateToProps, {getCategories})(StreamCreate)

