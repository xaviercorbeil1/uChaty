import React from 'react';
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
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
        }
    },
});

export function VideoConferenceControl(props) {
    const classes = useStyles()
    const {isMuted, setMute} = props

    return (
        <div className={classes.root}>
            <IconButton onClick={() => setMute(!isMuted)} className={classes.button} >
                {isMuted ? <MicOff/> : <Mic/> }
            </IconButton>
        </div>
    )
}

