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
                        <div style={{width: '70%', }}>
                            <br/>
                            <StreamShow stream={stream}/>
                            <br />
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <div>
                                    <h1>{stream.title}</h1>
                                    <div>
                                        <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                            {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                    </div>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <Link className="ui fluid large button" to="/login">Follow</Link>
                                    <Link className="ui fluid large button primary" to="/login">Subscribe</Link>
                                </div>
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
                            <div style={{width: '70%', }}>
                                <br/>
                                <StreamShow stream={stream}/>
                                <br />
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div>
                                        <h1>{stream.title}</h1>
                                        <div>
                                            <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                                {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', width:'37%'}}>
                                        <button className="ui fluid large button" >Edit Stream</button>
                                        <button className="ui fluid large button red" onClick={onEnd}>End Stream</button>
                                    </div>
                                </div>
                                
                            </div>    
                        )
                    } else {
                        return (
                            <div style={{width: '70%', }}>
                                <br/>
                                <StreamShow stream={stream}/>
                                <br />
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div>
                                        <h1>{stream.title}</h1>
                                        <div>
                                            <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                                {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <button className="ui fluid large button" >Follow</button>
                                        <button className="ui fluid large button primary" >Subscribe</button>
                                    </div>
                                </div>
                                
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
