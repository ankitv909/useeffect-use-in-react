import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Loader from "./loader";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
    },
    pagination: {
        '& > *': {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
    },
    padding:{
        paddingLeft:24,
        paddingRight:24
    },
    Card: {
        marginTop:'8rem',
        textAlign: "center",
        marginBottom:'2rem'
    },
    root: {
        width: '100%',
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
        boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },
}));

export default function Detail(props) {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState();
    const [user, setUser] = useState([]);
    const { id } = props.match.params;
    const rejected = () => {
        const previousRejectedList = localStorage.getItem('Rejected') ? JSON.parse(localStorage.getItem('Rejected')) : [];
        if(previousRejectedList){
            /*localStorage.setItem('Rejected', JSON.stringify([id]));*/
            console.log(previousRejectedList);
            previousRejectedList.includes(id);
            if(!previousRejectedList.includes(id)){
                previousRejectedList.push(id);
                localStorage.setItem('Rejected', JSON.stringify(previousRejectedList));
            }
        }
    }
    const selected = () => {
        const previousSelectedList = localStorage.getItem('Selected') ? JSON.parse(localStorage.getItem('Selected')) : [];
        if(previousSelectedList){
            /*localStorage.setItem('Rejected', JSON.stringify([id]));*/
            console.log(previousSelectedList);
            previousSelectedList.includes(id);
            if(!previousSelectedList.includes(id)){
                previousSelectedList.push(id);
                localStorage.setItem('Selected', JSON.stringify(previousSelectedList));
            }
        }
    }

    useEffect(() => {
        console.log(id);
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    const x = result.filter(item => {
                        return item.id === id
                    })[0];
                    if (x) {
                        setUser(x);
                    } else {
                        setUser(null);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [id]);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div><Loader/></div>;
    } else {

        return (
            <div className={classes.Card}>
                <Grid container justify="center"
                      alignItems="center"
                      className={classes.padding}
                      spacing={3}>
                        <Grid item lg={3}>
                            {
                                user ? <Card className={classes.root} >
                                    <CardHeader
                                        title={
                                            user.name
                                        }
                                    />
                                    {user.Image ? (
                                        <CardMedia
                                            className={classes.media}
                                            image={user.Image}
                                            title="Paella dish"
                                        />
                                    ) : (
                                        <Loader />
                                    )}
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                        >
                                            <Button variant="contained" color="primary" onClick={selected} component={Link} to="/">
                                                ShortList
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={rejected} component={Link} to="/">
                                                Reject
                                            </Button>

                                        </Grid>
                                    </CardContent>
                                </Card> : 'user not found'
                            }
                        </Grid>
                </Grid>
            </div>
        );
    }
}

