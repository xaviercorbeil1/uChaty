import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import socket from "../../socket/socket";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center",
        height: "30%",
        width: "100%",
    },
});

export function LoginPage(props) {
    const classes = useStyles()
    const [username, setUsername] = useState()
    const {getUsername} = props
    const [invalidUsername, setUsernameInvalid] = useState(false)

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const checkUsername = () => {
        if (username !== "") {
            socket.emit("createUsername", username, (valid) => {
                if (valid) {
                    setUsernameInvalid(false)
                    getUsername(username)
                } else {
                    setUsernameInvalid(true)
                }
            })
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant={"h2"}>
                Welcome to Uvid
            </Typography>
            <Typography variant={"body1"}>
                Please enter a username before joining
            </Typography>
            <TextField error={invalidUsername} helperText={invalidUsername ? "Username already used" : ""}
                       onChange={handleChange}
                       variant={"outlined"} label={"Add your name"} className={classes.white}/>
            <Button onClick={() => {
                checkUsername()
            }} variant="contained">Join</Button>
        </div>
    )
}

