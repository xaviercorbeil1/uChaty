import React from 'react';
import './App.css';
import {LoginPage} from "./components/login/LoginPage";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    App: {
        display: "flex",
        height: '100vh',
        alignItems: "center"
    },
});

function App() {
    const classes = useStyles();
  return (
    <div className= {classes.App}>
        <LoginPage/>
    </div>
  );
}

export default App;
