import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
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

export function NoInput() {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Typography variant={"body1"} className={classes.typography} align={"center"}>
                {"Please make sure that you have a mic/webcam connected"}
            </Typography>
        </Paper>
    )
}

