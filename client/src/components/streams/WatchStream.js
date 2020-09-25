import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import streams from '../../api/streams'
import StreamShow from './StreamShow'
import {signInWithToken, getStream} from '../../actions/actions'

const WatchStream = ({userInfo, signInWithToken, getStream, stream, match, allStreams}) => {
    const [cookies] = useCookies(['token'])
    const [streamWasDeleted, setDeleteStatus] = useState(false)

    useEffect(()=> {
        
        getStream(match.params.userName)
       
    }, [match.params.userName, getStream])

    const onEnd = () => {
        streams.delete('/mystream', {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        })
        .then(res => {
            setDeleteStatus(true)
        })
        .catch(err => {
            if (err.request) {
                console.log('err')
            }
        })
    }

    const onEdit = () => {

    }

    const onFollow = () => {

    }

    const onSubscribe = () => {

    }

    const noStream = () => {
        return (
            <div>
                <p>You don't have a stream yet!</p>
                <Link to="/streams/new">Create one</Link>
            </div> 
        )
    }

    const renderContent = () => {
        if (streamWasDeleted) {
            return (
                noStream()
            )
        }else if (!cookies.token) {
            if (stream && allStreams.length === 1) {
                if (stream.error) {
                    return <div>{stream.error}</div>
                } else {
                    return (
                        <div >
                            <StreamShow />
                            <div style={{display:'flex', alignItems:'center'}}>
                                <Link className="ui fluid large button" to="/login">Follow</Link>
                                <Link className="ui fluid large button primary" to="/login">Subscribe</Link>
                            </div>
                        </div>
                    )
                }
            }
            
        } 
        else {
            if (!userInfo) {
                signInWithToken(cookies.token)
            } else {
                 if (stream && allStreams.length === 1) {
                    if (stream.errorName === userInfo.username) {
                        return(
                            noStream()
                        )
                    } else if (stream.error) {
                        return <div>{stream.error}</div>
                    } else if (userInfo.id===stream.user) {
                        return (
                            <div>
                                <StreamShow />
                                <button onClick={onEdit}>Edit Stream</button>
                                <button onClick={onEnd}>End Stream</button>
                            </div>    
                        )
                    } else {
                        console.log('pq')
                        return (
                            
                            <div>
                                <StreamShow />
                                <button onClick={onSubscribe}>Subscribe</button>
                                <button onClick={onFollow}>Follow</button>
                            </div>  
                             
                        )
                    }
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
    return {userInfo: state.auth.userInfo, stream: state.streams[0], allStreams: state.streams}
}

export default connect(mapStateToProps, {signInWithToken, getStream})(WatchStream)
