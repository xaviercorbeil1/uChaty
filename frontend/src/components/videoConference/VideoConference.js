import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {VideoPlayer} from "./VideoPlayer";
import socket from "../../socket/socket"
import {VideoConferenceControl} from "./VideoConferenceControl";
import {useHistory} from "react-router-dom";
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

export function VideoConference(props) {
    const classes = useStyles()
    const {username} = props
    const history = useHistory()
    const videoRef = useRef()
    const [isMuted, setMute] = useState(false)
    const [peers, setPeers] = useState([])
    const peersRef = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
            videoRef.current.srcObject = stream
            console.log("stream")
            const connectedPeers = []
            socket.on("get room users", (usernames) => {
                usernames.forEach(username => {
                    const peer = createPeer(stream, username)
                    peersRef.current.push({username: username, peer})
                    connectedPeers.push(peer)
                })
                setPeers(connectedPeers)
            })

            socket.on("user joined", (signal, username) => {
                const peer = addPeer(stream, signal, username)
                peersRef.current.push({username, peer})
                setPeers([...peers, peer])
            })

            socket.on("receive signal", (signal, username) => {
                const peer = peersRef.current.find(peer => {
                    return peer.username === username
                })

                peer.peer.signal(signal)
            })

            const createVideoConference = () => {
                socket.emit("createVideoConference", (roomId) => {
                    history.push(`/${roomId}`)
                })
            }

            const joinVideoConference = (roomId) => {
                socket.emit("joinVideoConference", roomId, (response) => {
                    if (response === "fullroom") {
                        history.push('/fullroom')
                    } else if (response === "noroom") {
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
        })
    }, [videoRef, history])

    function createPeer(stream, username) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on("signal", signal => {
            socket.emit("send signal", username, signal)
        })

        return peer
    }

    function addPeer(stream, signalFromUser, username) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        })

        peer.on("signal", signal => {
            socket.emit("return signal", username, signal)
        })

        peer.signal(signalFromUser)

        return peer
    }

    function PeerVideo(props) {
        const {peer} = props
        const videoRef = useRef()
        useEffect(() => {
            peer.on("stream", stream => {
                debugger
                videoRef.current.srcObject = stream;
            })
        }, []);

        return <VideoPlayer isMuted={false} video={videoRef} username={"testing"}/>
    }

    return (
        <div className={classes.root}>
            <div className={classes.players}>
                <VideoPlayer isMuted={true} video={videoRef} username={username}/>
                {peers.map((peer,index) =>
                    <PeerVideo peer={peer} key={index}/>
                )}
            </div>
            <div className={classes.control}>
                <VideoConferenceControl isMuted={isMuted} setMute={setMute}/>
            </div>
        </div>
    )
}

