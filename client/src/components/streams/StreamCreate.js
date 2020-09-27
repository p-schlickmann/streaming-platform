import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import {getCategories, signInWithToken} from '../../actions/actions'
import streams from '../../api/streams'

const StreamCreate = ({categories, getCategories, signInWithToken, userInfo}) => {
    const [message, setMessage] = useState('')
    const [cookies] = useCookies(['token'])

    useEffect(()=>{
        signInWithToken(cookies.token)
        getCategories()
    }, [getCategories, signInWithToken, cookies])

    const renderDropdown = () => {
        return categories.map(cat => {
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
            if (res.status===201) {
                setMessage('Stream Created Successfully! Available at  ')
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
            <Link to={`/live/${userInfo.username}`} style={{display: 'inline'}}>{message ? `http://localhost:3000/live/${userInfo.username}` : null}</Link>
        </form> 
        :<Redirect to="/login"/>
    )
}



const mapStateToProps = state => {
    return {categories: state.categories, userInfo: state.auth.userInfo}
}

export default connect(mapStateToProps, {getCategories, signInWithToken})(StreamCreate)

