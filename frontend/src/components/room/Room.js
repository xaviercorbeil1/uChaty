import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";
import socket from "../../socket/socket"
import {RoomControl} from "./RoomControl";
import Peer from "simple-peer";

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

export function Room(props) {
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
                    connectedPeers.push(peer)
                })
                setPeers(connectedPeers)
            })

            socket.on("user joined", (signal, user) => {
                const peer = addPeer(stream, signal, user)
                peersRef.current.push({username: user, peer})
                setPeers(peers => [...peers, peer])
            })

            socket.on("receive signal", (signal, username) => {
                const peer = peersRef.current.find(peer => {
                    return peer.username === username
                })
                peer.peer.signal(signal)
            })

            socket.on("user left", (username) => {
                const peerRef = peersRef.current.find(userRef => {
                    return userRef.username === username
                })

                let index = peers.indexOf(peerRef.peer)
                peers.slice(index, 1)

                index = peersRef.current.indexOf(peerRef)
                peersRef.slice(index, 1)
            })
        })
    }, [])

    function createPeer(stream, usernameToSignal, callerUsername) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", signal => {
            socket.emit("send signal", usernameToSignal, callerUsername, signal)
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
            if(signal.type) {
                socket.emit("return signal", callerUsername, signal)
            }
        })

        peer.signal(signalFromUser)

        return peer
    }

    function PeerVideo(props) {
        const {peer} = props
        const videoRef = useRef()
        useEffect(() => {
            peer.on("stream", stream => {
                videoRef.current.srcObject = stream;
            })
        }, []);

        return <VideoPlayer isMuted={false} video={videoRef} username={"testing"}/>
    }

    return (
        <div className={classes.root}>
            <div className={classes.players}>
                <VideoPlayer isMuted={true} video={videoRef} username={username}/>
                {peers.map((peer, index) =>
                    <PeerVideo peer={peer} key={index}/>
                )}
            </div>
            <div className={classes.control}>
                <RoomControl isMuted={isMuted} setMute={setMute}/>
            </div>
        </div>
    )
}

