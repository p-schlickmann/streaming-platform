import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import streams from '../../api/streams'
import StreamShow from './StreamShow'
import Chat from './Chat'
import Modal from '../Modal'
import {signInWithToken, getStream} from '../../actions/actions'

const WatchStream = ({userInfo, signInWithToken, getStream, stream, match, allStreams}) => {
    const [cookies] = useCookies(['token'])
    const [streamWasDeleted, setDeleteStatus] = useState(false)
    const [wasFollowed, follow] = useState(false)
    const [wasSubscribed, subscribe] = useState(false)
    const [displayModal, setModal] = useState(false)

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

        setModal(false)
    }

    const noStream = () => {
        return (
            <div>
                <h2>Oops!</h2>
                <h3>It seems like you don't have a stream yet!</h3>
                <Link className="ui button primary" to="/stream/new">Create one</Link>
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
                        <div style={{display:'flex'}}>
                            <div style={{width: '70%', }}>
                            <br/>
                            <StreamShow stream={stream}/>
                            <br />
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <div style={{width: '60%', }}>
                                    <h1>{stream.title}</h1>
                                    <div>
                                        <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                            {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                    </div>
                                </div>
                                <div style={{display:'flex', alignItems:'center', width:'40%', marginLeft: '15px'}}>
                                    <Link className="ui fluid large button" to="/login">
                                        <i className="user icon"></i>
                                        Follow</Link>
                                    <Link className="ui fluid large button primary" to="/login">
                                        <i className="dollar icon"></i>
                                        Subscribe</Link>
                                </div>
                                
                                </div>
                            </div>
                            <div style={{marginLeft:"15px", width:'30%'}}>
                                    <br/>
                                    <Chat userInfo={userInfo} />    
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
                            <div style={{display: 'flex'}}>
                                <div style={{width: '70%', }}>
                                <br/>
                                <StreamShow stream={stream}/>
                                <br />
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div style={{width:'60%'}}>
                                        <h1>{stream.title}</h1>
                                        <div>
                                            <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                                {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', marginLeft: '15px', width:'40%'}}>
                                        <Link className="ui fluid large button" to="/stream/edit">Edit Stream</Link>
                                        <button className="ui fluid large button red" onClick={() => setModal(true)}>End Stream</button>
                                        {displayModal ? <Modal setModal={setModal} onEnd={onEnd} title="End Stream" message="This action is permanent. And it will also delete this stream forever"/> : null }
                                    </div>
                                </div>
                                
                                </div> 
                                <div style={{marginLeft:"15px", width:'30%'}}>
                                    <br/>
                                    <Chat userInfo={userInfo} />    
                                </div>   
                            </div>
                           
                        )
                    } else {
                        return (
                            <div style={{display:'flex'}}>
                                <div style={{width: '70%', }}>
                                <br/>
                                <StreamShow stream={stream}/>
                                <br />
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div >
                                        <h1>{stream.title}</h1>
                                        <div style={{width:'50%'}}>
                                            <strong style={{fontSize: '15px'}}>{stream.username} </strong>
                                                {stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', marginLeft: '15px', width:'50%'}}>
                                        <button onClick={() => follow(!wasFollowed)} className="ui fluid large button" >
                                            <i className={`${wasFollowed ? "check" : "user"} icon`}></i>
                                            {wasFollowed? 'Following' : 'Follow'}</button>
                                        <button onClick={() => subscribe(!wasSubscribed)} className="ui fluid large button primary" >
                                            <i className={`${wasSubscribed ? "check" : "dollar"} icon`}></i>
                                            {wasSubscribed ? "Subscribed" : "Subscribe"}</button>
                                    </div>
                                    

                                </div>
                                    
                                </div> 
                                <div style={{marginLeft:"15px", width:'30%'}}>
                                    <br/>
                                    <Chat userInfo={userInfo} />    
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
