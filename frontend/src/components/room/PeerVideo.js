import React, {useEffect, useRef} from "react";
import {VideoPlayer} from "./VideoPlayer";

export const PeerVideo = (props) => {
    const {peer} = props
    const videoRef = useRef()
    useEffect(() => {
        peer.on("stream", stream => {
            console.log("stream connected")
            videoRef.current.srcObject = stream;
        })
    }, [peer]);
    console.log(videoRef)

    return <VideoPlayer isMuted={false} video={videoRef} username={"testing"}/>
}