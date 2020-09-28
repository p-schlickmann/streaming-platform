import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import StreamManageForm from './StreamManageForm'
import {signInWithToken} from '../../actions/actions'
import streams from '../../api/streams'

const StreamCreate = ({signInWithToken, userInfo}) => {
    const [message, setMessage] = useState('')
    const [cookies] = useCookies(['token'])

    useEffect(()=>{
        signInWithToken(cookies.token)

    }, [signInWithToken, cookies])

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

    const renderContent = () => {
        if (!cookies.token) {
            return <Redirect to="/login"/>
        } 
        if (userInfo) {
            return <StreamManageForm userInfo={userInfo} onSubmit={onSubmit} message={message} initVal={null} />
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

export default connect(mapStateToProps, {signInWithToken})(StreamCreate)

