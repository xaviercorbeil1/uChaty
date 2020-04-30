import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import socket from "../../socket/socket";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center",
        height: "30%",
        width: "50%",
        backgroundColor: "#383a42"

    },
    typography: {
        color: "#c4c4c4",
        fontFamily: "Roboto",
    },
    button: {
        color: "#c4c4c4",
        backgroundColor: "#25252f",
        '&:hover': {
            backgroundColor: "#18181f"
        }
    }
}));

export function LoginPage(props) {
    const classes = useStyles()
    const [username, setUsername] = useState("")
    const {getUsername} = props
    const [invalidUsername, setUsernameInvalid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const checkUsername = () => {
        const trimUsername = username.trim()
        if (trimUsername !== "") {
            socket.emit("createUsername", trimUsername, (valid) => {
                if (valid) {
                    setUsernameInvalid(false)
                    getUsername(trimUsername)
                    setUsername(trimUsername)
                } else {
                    setUsernameInvalid(true)
                    setErrorMessage("Username already used")
                }
            })
        } else {
            setUsernameInvalid(true)
            setErrorMessage("Invalid username")
        }
    }

    return (
        <Paper className={classes.root}>
            <Typography className={classes.typography} variant={"h2"} align={"center"}>
                Welcome to uChaty
            </Typography>
            <Typography className={classes.typography} variant={"body1"} align={"center"}>
                Please enter a username before joining
            </Typography>
            <TextField autoFocus error={invalidUsername} helperText={invalidUsername ? errorMessage : ""}
                       onChange={handleChange}
                       variant={"outlined"} label={"Add your name"} />
            <Button className={classes.button} onClick={() => {
                checkUsername()
            }} variant="contained">Join</Button>
        </Paper>
    )
}

