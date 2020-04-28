import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./components/login/LoginPage";
import {makeStyles} from "@material-ui/styles";
import {VideoConference} from "./components/videoConference/VideoConference";
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from "react-router";
import {Unavailable} from "./components/Unavailable/Unavailable";

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

    const getUsername = (username) => {
        setUsername(username)
    }

    return (
        <BrowserRouter>
            <div className={classes.App}>
                {username !== "" ?
                    <Switch>
                        <Route exact path={"/noroom"}>
                            <Unavailable text={`This room doesn't exist.`}/>
                        </Route>
                        <Route exact path={"/fullroom"}>
                            <Unavailable text={`This room is full.`}/>
                        </Route>
                        <Route path={"/"}>
                            <VideoConference username={username}/>
                        </Route>
                    </Switch>
                    :
                    <Route>
                        <LoginPage getUsername={getUsername}/>
                    </Route>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
