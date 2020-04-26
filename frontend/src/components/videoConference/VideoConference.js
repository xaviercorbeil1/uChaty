import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: "100%",
        width: "100%"
    },
});

export function VideoConference(props) {
    const classes = useStyles()
    const {username} = props
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef) {
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
                const video = videoRef.current
                video.srcObject = stream
                video.play()
            })
        }
    }, [videoRef])


    return (
        <div className={classes.root}>
            <VideoPlayer isMuted={false} video={videoRef} username={username}/>
        </div>
    )
}

