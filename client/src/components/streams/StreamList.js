import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {getStreams} from '../../actions/actions'

const StreamList = ({getStreams, streams, match}) => {

    useEffect(() => {
            getStreams(match.params.categoryName)
    }, [])

    const renderStreams = () => {
        console.log(streams)
        if (!streams) {
            return (
            <Redirect to="/streams"/>
            )
        }
        return streams.map(stream => {
            if (!stream.title) return null
            return(
                <div className="item" key={stream.id} style={{cursor:'pointer'}} onClick={() => ''}>
                    <br/>
                    <i className="big middle aligned icon camera" />
                    <div className="content" >
                        <strong style={{fontSize: '20px'}}>{stream.title}</strong>
                    <div className="description"><strong style={{fontSize: '15px'}}>{stream.username} </strong>{stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}</div>
                    </div>
                    <br/>
                </div>
            )
        })
    }

    return (
        <div>
            <h3>Live</h3>
            <div className="ui celled list">
            {renderStreams()}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {streams: state.streams, cookies: ownProps.cookies}
}

export default connect(mapStateToProps, {getStreams})(StreamList)
