import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import StreamShow from './StreamShow'
import {signInWithToken, getStream} from '../../actions/actions'

const WatchStream = ({userInfo, signInWithToken, getStream, stream, match}) => {
    const [shouldRedirect, setRedirect] = useState(false)
    const [cookies] = useCookies(['token'])

    useEffect(()=> {
        getStream(match.params.userName)
    }, [match.params.userName, getStream])

    const onEnd = () => {

    }

    const onEdit = () => {

    }

    const onFollow = () => {

    }

    const onSubscribe = () => {

    }

    const renderContent = () => {
        if (!cookies.token) {
            return (
                <div >
                    <StreamShow />
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Link className="ui fluid large button" to="/login">Follow</Link>
                        <Link className="ui fluid large button primary" to="/login">Subscribe</Link>
                    </div>
                </div>
            )
        } else if (shouldRedirect) {
            return (
                <Redirect to="/streams/new" />
            )
        } 
        else {
            if (!userInfo) {
                signInWithToken(cookies.token)
            } else {
                 if (stream) {
                     
                    if (stream.errorName === userInfo.username) setRedirect(true)
                     
                    if (userInfo.id===stream.user) {
                        return (
                            <div>
                                <StreamShow />
                                <button onClick={onEdit}>Edit Stream</button>
                                <button onClick={onEnd}>End Stream</button>
                            </div>    
                        )
                    } else {
                        return (
                            <div>
                                <StreamShow />
                                <button onClick={onSubscribe}>Subscribe</button>
                                <button onClick={onFollow}>Follow</button>
                            </div>    
                        )
                    }
                } else {
                    return <div>Stream not found</div>
                }
            }
        }
    }
    return(

        <div>
            {renderContent()}
        </div>

    )

}

const mapStateToProps = state => {
    return {userInfo: state.auth.userInfo, stream: state.streams[0]}
}

export default connect(mapStateToProps, {signInWithToken, getStream})(WatchStream)
