import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import StreamManageForm from './StreamManageForm'
import {getStream, signInWithToken} from '../../actions/actions'
import streams from '../../api/streams'


const StreamEdit = ({signInWithToken, userInfo, stream, getStream}) => {
    const [message, setMessage] = useState('')
    const [cookies] = useCookies(['token'])

    useEffect(() => {

        signInWithToken(cookies.token)
    }, [signInWithToken, cookies.token])

    useEffect(() => {
        if (userInfo) {
            getStream(userInfo.username)
        }
    }, [userInfo, getStream])

    const onSubmit = (event) => {
        event.preventDefault()
        const formValues = {
            token: cookies.token,
            category: event.target.category.value,
            title: event.target.title.value
        }
        streams.put('mystream/', formValues, {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        })
        .then(res => {
            if (res.status === 200 || res.status === 204) {
                setMessage('Redirect')
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
            return <StreamManageForm userInfo={userInfo} onSubmit={onSubmit} message={message} initVal={stream} />
        }
    } 

    return (
        <div>
            {renderContent()}
        </div>
    )
}

const mapStateToProps = state => {
    return {userInfo: state.auth.userInfo, stream: state.streams[0]}
}

export default connect(mapStateToProps, {signInWithToken, getStream})(StreamEdit)

