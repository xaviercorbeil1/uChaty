import React, {useEffect} from "react";
import socket from "../../socket/socket";
import {useHistory} from "react-router-dom";

export function AddRoom(props) {
    const {setJoined} = props
    const history = useHistory()

    useEffect(() => {
        socket.emit("createVideoConference", (roomId) => {
            setJoined(true)
            history.push(`/room/${roomId}`)
        })
    }, [history, setJoined])

    return (<div/>)
}