import React from 'react';
import {makeStyles} from "@material-ui/styles";
import ReactPlayer from "react-player";

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

    return (
        <div className={classes.root}>
            <ReactPlayer url={stream} width='100%' height='100%'  muted={isMuted} className={classes.video} playing controls/>
            <div className={classes.username}>{username}</div>
        </div>
    )
}

