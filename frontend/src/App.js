import React, {useEffect, useState} from 'react';
import './App.css';
import {LoginPage} from "./components/login/LoginPage";
import {makeStyles} from "@material-ui/styles";
import {VideoConference} from "./components/videoConference/VideoConference";
import { BrowserRouter, Route } from 'react-router-dom';

const useStyles = makeStyles({
    App: {
        display: "flex",
        height: '100vh',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4f525e"
    },
});

function App() {
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")

    useEffect(() => {
        const id = window.location.pathname.substring(1)
        setRoomId(id)
    }, [])


    const getUsername = (username) => {
        setUsername(username)
    }

    return (
        <BrowserRouter>
            <div className={classes.App}>
                {username !== "" ?
                    <Route>
                        <VideoConference username={username} roomId={roomId}/>
                    </Route>:
                    <Route>
                        <LoginPage getUsername={getUsername}/>
                    </Route>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
