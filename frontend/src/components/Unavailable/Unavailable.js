import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#383a42",
        width:"40%",
        height: "20%",
        alignItems: "center",
        justifyContent: "space-around",
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
        },
        width: "30%"
    }
});

export function Unavailable(props) {
    const classes = useStyles()
    const history = useHistory()
    const {text} = props;

    const returnToHome = () => {
        history.push("")
    }

    return (
        <Paper className={classes.root}>
            <Typography variant={"h4"} className={classes.typography}>
                {text}
            </Typography>
            <Button onClick={returnToHome} className={classes.button} variant={"contained"}>
                {"Create room"}
            </Button>
        </Paper>
    )
}

