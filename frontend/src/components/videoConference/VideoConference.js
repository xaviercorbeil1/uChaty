import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";
import socket from "../../socket/socket"
import {VideoConferenceControl} from "./VideoConferenceControl";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: "100%",
        width: "100%",
        flexDirection: "column"
    },
    players: {
        display: "flex",
        height: "93%",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",

    },
    control: {
        height: "7%",
        backgroundColor: "#383a42"
    }
});

export function VideoConference(props) {
    const classes = useStyles()
    const {username} = props
    const history = useHistory()
    const videoRef = useRef(null)
    const [isMuted, setMute] = useState(false)

    useEffect(() => {
        const createVideoConference = () => {
            socket.emit("createVideoConference", (roomId) => {
                history.push(`/${roomId}`)
            })
        }

        const joinVideoConference = (roomId) => {
            socket.emit("joinVideoConference", roomId, (data) => {
                if(data) {
                    if(data.length > 4) {
                        history.push('/fullroom')
                    }
                } else {
                    history.push('/noroom')
                }
            })

        }
        const roomId = window.location.pathname.substring(1)

        if (roomId !== "") {
            joinVideoConference(roomId)
        } else {
            createVideoConference()
        }
    },[history])

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
            <div className={classes.players}>
                <VideoPlayer isMuted={true} video={videoRef} username={username}/>
            </div>
            <div className={classes.control}>
                <VideoConferenceControl isMuted={isMuted} setMute={setMute}/>
            </div>
        </div>
    )
}

