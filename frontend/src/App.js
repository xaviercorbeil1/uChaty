import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./components/login/LoginPage";
import {makeStyles} from "@material-ui/styles";
import {Room} from "./components/room/Room";
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from "react-router";
import {Unavailable} from "./components/Unavailable/Unavailable";
import {AddRoom} from "./components/room/AddRoom";
import {JoinRoom} from "./components/room/JoinRoom";
import {NoInput} from "./components/Unavailable/NoInput";

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
    const [joined, setJoined] = useState(false)

    const getUsername = (username) => {
        setUsername(username)
    }

    return (
        <BrowserRouter>
            <div className={classes.App}>
                {username !== "" ?
                    <>
                        {joined ? <Switch>
                                <Route path={"/room/:roomId"}>
                                    <Room username={username}/>
                                </Route>
                                <Route exact path={"/"}>
                                    <NoInput/>
                                </Route>
                            </Switch>
                            :
                            <Switch>
                                <Route exact path={"/"}>
                                    <AddRoom setJoined={setJoined}/>
                                </Route>
                                <Route path={"/room/:roomId"}>
                                    <JoinRoom setJoined={setJoined}/>
                                </Route>
                                <Route exact path={"/noroom"}>
                                    <Unavailable text={`This room doesn't exist.`}/>
                                </Route>
                                <Route exact path={"/fullroom"}>
                                    <Unavailable text={`This room is full.`}/>
                                </Route>
                            </Switch>
                        }
                    </>
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
