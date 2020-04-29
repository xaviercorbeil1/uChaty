import React from 'react';
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    button: {
        borderRadius: 50,
        backgroundColor: "#424242",
        color: "white",
        '&:hover': {
            backgroundColor: "#2b2b2b"
        },
    },
    textfield: {
        width: 400
    }
});

export function RoomControl(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TextField className={classes.textfield} disabled label={`Invite link`} variant={"outlined"} defaultValue={window.location.href}
                       size={"medium"}/>
        </div>
    )
}

