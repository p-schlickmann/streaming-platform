import React, { useEffect} from 'react'
import {connect} from 'react-redux'

import {getStreams} from '../../actions/actions'

const StreamList = ({getStreams, streams}) => {
    useEffect(() => {
        getStreams()
    }, [])

    const renderStreams = () => {
        return streams? streams.map(stream => {
            if (!stream.category_name) {
                stream.category_name = 'All around'
            }
            return(
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content" >
                    {stream.title}
                    <div className="description">{stream.username} | {stream.category_name}</div>
                    </div>
                </div>
            )
        }) : null
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
