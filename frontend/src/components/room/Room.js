import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";
import socket from "../../socket/socket"
import {RoomControl} from "./RoomControl";
import Peer from "simple-peer";
import {useHistory} from "react-router-dom";

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

export const Room = (props) => {
    const classes = useStyles()
    const {username} = props
    const [video, setVideo] = useState()
    const [peerStreams, setPeerStreams] = useState([]);
    const history = useHistory()


    const loadEvent = useCallback((stream) => {
        const peers = new Map()

        socket.emit("get room users", (roomUsers) => {
            roomUsers.forEach(roomUser => {
                const peer = createPeer(stream, roomUser, username)
                peers.set(roomUser, {stream, peer})

                peer.on("stream", stream => {
                    setPeerStreams(prevState => [...prevState, {username: roomUser, stream}])
                    peers.get(roomUser).stream = stream
                })
            })
        })

        socket.on("user joined", (signal, user) => {
            const peer = addPeer(stream, signal, user)
            peers.set(user, {peer, stream: undefined})
            peer.on("stream", stream => {
                setPeerStreams(prevState => [...prevState, {username: user, stream}])
                peers.get(user).stream = stream
            })
        })

        socket.on("receive signal", (signal, username) => {
            peers.get(username).peer.signal(signal)
        })

        socket.on("user left", (username) => {
            peers.delete(username)
            const updatePeers = []
            peers.forEach((value, key) => {
                updatePeers.push({username: key, stream: value.stream})
            })
            setPeerStreams(updatePeers)
        })
    }, [username])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
            setVideo(stream)
            loadEvent(stream)
        }).catch(() => {
            navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                setVideo(stream)
                loadEvent(stream)
            }).catch(() => {
                history.push('/')
            })
        })

    }, [history, loadEvent])

    function createPeer(stream, usernameToSignal, callerUsername) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", signal => {
            socket.emit("send signal", usernameToSignal, callerUsername, signal)
        })

        peer.on('close', () => {
            peer.destroy()
        })

        return peer
    }

    function addPeer(stream, signalFromUser, callerUsername) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", signal => {
            if (signal.type) {
                socket.emit("return signal", callerUsername, signal)
            }
        })

        peer.on('close', () => {
            peer.destroy()
        })

        peer.signal(signalFromUser)
        return peer
    }
    return (
        <div className={classes.root}>
            <div className={classes.players}>
                <VideoPlayer isMuted={true} stream={video} username={username}/>
                {peerStreams.map((peer) => {
                        return (<VideoPlayer stream={peer.stream} username={peer.username} key={peer.username}/>)
                    }
                )}
            </div>
            <div className={classes.control}>
                <RoomControl/>
            </div>
        </div>
    )
}

