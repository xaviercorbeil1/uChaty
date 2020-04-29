import React, {useEffect, useRef} from "react";
import {VideoPlayer} from "./VideoPlayer";

export const PeerVideo = (props) => {
    const {peer, username} = props
    const videoRef = useRef()
    useEffect(() => {
        console.log("reload stream")
        console.log(videoRef.current)
        peer.on("stream", stream => {
            videoRef.current.srcObject = stream;
            console.log(videoRef.current)
        })
    }, [peer]);

    return <VideoPlayer isMuted={false} video={videoRef} username={username}/>
}