import React, {useEffect} from "react";
import socket from "../../socket/socket";
import {useHistory} from "react-router-dom";

export function JoinRoom(props) {
    const history = useHistory()
    const {setJoined} = props

    useEffect(() => {
        const url = window.location.pathname
        const roomId = url.replace('/room/','')

        socket.emit("joinRoom", roomId, (response) => {
            switch (response) {
                case "fullroom":
                    history.push('/fullroom')
                    break
                case "noroom":
                    history.push('/noroom')
                    break
                default:
                    console.log(`Joined room ${roomId}`)
                    setJoined(true)
            }
        })
    }, [history, setJoined])

    return (<div/>)
}