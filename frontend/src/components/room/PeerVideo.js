import React, {useEffect, useRef} from "react";
import {VideoPlayer} from "./VideoPlayer";

export const PeerVideo = (props) => {
    const {peer, username} = props
    const videoRef = useRef()
    useEffect(() => {
        peer.on("stream", stream => {
            videoRef.current.srcObject = stream;
        })
    }, [peer]);

    return <VideoPlayer isMuted={false} video={videoRef} username={username}/>
}