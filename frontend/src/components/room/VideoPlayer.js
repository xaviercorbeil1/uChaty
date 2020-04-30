import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: "relative",
        flexDirection: "column",
        height: "40%",
        width: "30%",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    video: {
        width: "100%",
        position: "relative",
        zIndex: 0,
    },
    username: {
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 5,
        zIndex: 1,
        backgroundColor: "black",
        color: "white",
        borderRadius: 5
    }
});

export function VideoPlayer(props) {
    const classes = useStyles()
    const {stream, username, isMuted} = props

    function createVideoElement(element) {
        if (stream && element) {
            element.srcObject = stream
        }
    }
    return (
        <div className={classes.root}>
            <video id={`video-${username}`} ref={createVideoElement} onLoad={createVideoElement} autoPlay muted={isMuted} className={classes.video}/>
            <div className={classes.username}>{username}</div>
        </div>
    )
}

