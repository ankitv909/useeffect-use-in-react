import React from "react";
import Card from "./card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    Home:{
        overflow: "hidden",
        marginTop: "6rem"
    }
}));


function Home() {
    const classes = useStyles();
    return (
        <div className={classes.Home}>
            <Card/>
        </div>
    );
}

export default Home;
