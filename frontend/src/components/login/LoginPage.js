import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

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

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    return (
        <div className={classes.root}>
            <Typography variant={"h2"}>
                Welcome to Uvid
            </Typography>
            <Typography variant={"body1"}>
                Please enter your name before joining
            </Typography>
            <TextField onChange={handleChange} variant={"outlined"} label={"Add your name"} className={classes.white}/>
            <Button onClick={() => {
                getUsername(username)
            }} variant="contained">Join</Button>
        </div>
    )
}

