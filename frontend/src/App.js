import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./components/login/LoginPage";
import {makeStyles} from "@material-ui/styles";
import {VideoConference} from "./components/videoConference/VideoConference";

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
    <div className= {classes.App}>
        {username !== "" ? <VideoConference username={username}/> : <LoginPage getUsername={getUsername}/>}
    </div>
  );
}

export default App;
