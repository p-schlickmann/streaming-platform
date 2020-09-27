import React, {useRef, useEffect} from 'react'
import flv from 'flv.js'

const StreamShow = ({stream}) => {
    const videoRef = useRef()

    useEffect(() => {
        const player = flv.createPlayer({
            type: 'flv',
            url: `http://lovalhost:8001/live/${stream.id}.flv`
        })
        player.attachMediaElement(videoRef.current)
        player.load()

        return player.destroy()
    },[stream])

    
    return (
        <div>
            <video ref={videoRef} style={{width:'100%', height:'60vh'}} controls/> 
        </div>
    )
}

export default StreamShow
