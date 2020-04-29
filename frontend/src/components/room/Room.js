import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";
import socket from "../../socket/socket"
import {RoomControl} from "./RoomControl";
import Peer from "simple-peer";
import {PeerVideo} from "./PeerVideo";

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
    const videoRef = useRef()
    const [isMuted, setMute] = useState(false)
    const [peers, setPeers] = useState([])
    const peersRef = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
            videoRef.current.srcObject = stream
            socket.emit("get room users", (roomUsers) => {
                const connectedPeers = []
                roomUsers.forEach(roomUser => {
                    const peer = createPeer(stream, roomUser, username)
                    peersRef.current.push({username: roomUser, peer})
                    connectedPeers.push(roomUser)
                })
                setPeers(connectedPeers)
            })

            socket.on("user joined", (signal, user) => {
                const peer = addPeer(stream, signal, user)
                peersRef.current.push({username: user, peer})
                setPeers(peers => [...peers, user])
            })

            socket.on("receive signal", (signal, username) => {
                const peer = peersRef.current.find(peer => {
                    return peer.username === username
                })
                peer.peer.signal(signal)
            })

            socket.on("user left", (username) => {
                peersRef.current = peersRef.current.filter(userRef => {
                    if (userRef.username === username) {
                        userRef.peer.destroy()
                    }
                    return userRef.username !== username
                })

                const index = peers.indexOf(username)
                const peersCopy = [...peers]
                peersCopy.slice(index)
                setPeers(peersCopy)
            })
        })
    },[])

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
                <VideoPlayer isMuted={true} video={videoRef} username={username}/>
                {console.log(peersRef)}
                {peersRef.current.map((peerRef, index) => {
                        return (<PeerVideo peer={peerRef.peer} username={peerRef.username} key={index}/>)
                    }
                )}
            </div>
            <div className={classes.control}>
                <RoomControl isMuted={isMuted} setMute={setMute}/>
            </div>
        </div>
    )
}

