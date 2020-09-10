import React, { useEffect} from 'react'
import {connect} from 'react-redux'

import {getStreams} from '../../actions/actions'

const StreamList = ({getStreams, streams}) => {
    useEffect(() => {
        getStreams()
    }, [])

    const renderStreams = () => {
        return streams.map(stream => {
            if (!stream.title) return null
            return(
                <div className="item" key={stream.id}>
                    <i className="big middle aligned icon camera" />
                    <div className="content" >
                        <strong style={{fontSize: '20px'}}>{stream.title}</strong>
                    <div className="description"><strong style={{fontSize: '15px'}}>{stream.username} </strong>{stream.category_name ?  `is streaming ${stream.category_name}` : 'is Live'}</div>
                    </div>
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

const mapStateToProps = (state) => {
    return {streams: state.streams}
}

export default connect(mapStateToProps, {getStreams})(StreamList)
