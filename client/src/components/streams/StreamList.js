import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import {getStreams} from '../../actions/actions'

const StreamList = ({getStreams, streams, match}) => {
    useEffect(() => {
            getStreams(match.params.categoryName)
    }, [match.params.categoryName, getStreams])

    const renderStreams = () => {
        if (!streams) {
            return (
            <Redirect to="/streams"/>
            )
        }
        return streams.map(stream => {
            if (!stream.title) return null
            return(
                <Link className="item" key={stream.id} to={`/live/${stream.username}`}>
                    <br/>
                    <i className="big middle aligned icon camera" />
                    <div className="content" >
                        <strong style={{fontSize: '20px'}}>{stream.title}</strong>
                    <div className="description"><strong style={{fontSize: '15px'}}>{stream.username} </strong>{stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}</div>
                    </div>
                    <br/>
                </Link>
                
                    

            )
        })
    }

    const noStreams = () => {
        if (match.params.categoryName) return <h2>No streams were found :(</h2>
    }

    return (
        <div>
            <h3>Live</h3>
            <div className="ui celled list">
                {streams[0] ? renderStreams() : noStreams()}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {streams: state.streams, cookies: ownProps.cookies}
}

export default connect(mapStateToProps, {getStreams})(StreamList)
