import React, {useState,useEffect} from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Loader from "./loader";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {Accordion, AccordionDetails, AccordionSummary, Avatar, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop:'2rem',
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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    marginList :{
        margin: 2
    }
}));

export default function Simple() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState();
    const [items, setItems] = useState([]);
    const [rejectedItem, setRejectedItem] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFiltered] = useState([]);



/*connected api */
    useEffect(() => {
        fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    const rejectedLocal = JSON.parse(localStorage.getItem('Rejected'));
                    const selectedLocal = JSON.parse(localStorage.getItem('Selected'));
                    if (rejectedLocal) {
                        setRejectedItem(result.filter(x => rejectedLocal.includes(x.id)));
                    }
                    if (rejectedLocal) {
                        setSelectedItem(result.filter(x => selectedLocal.includes(x.id)))
                    }

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[])
    useEffect(() => {
        setFiltered(
            items.filter((list) =>
                list.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, items]);

   /* handle error and response*/
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div><Loader/></div>;
    } else {

        return (
            <div className={classes.Card}>
                <Grid container spacing={3} className={classes.padding}>
                <Grid item xs={3}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Rejected List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                                  >
                                {rejectedItem && rejectedItem.length > 0 ? rejectedItem.map(item =>
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="center"
                                         className={classes.marginList} key={item.id}>
                                        <Grid item>
                                            <Avatar src={item.Image}/>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography noWrap>{item.name}</Typography>
                                        </Grid>
                                    </Grid>
                                ): 'not rejected list Found hoti'}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={3}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Selected List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                                  >
                                {selectedItem && selectedItem.length > 0 ? selectedItem.map(item =>
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="center"
                                          className={classes.marginList}  key={item.id}>
                                        <Grid item>
                                            <Avatar src={item.Image}/>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography noWrap>{item.name}</Typography>
                                        </Grid>
                                    </Grid>
                                ):'not selected list found hoti'}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                </Grid>
                <Grid container justify="flex-end" >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
/*
                            onChange={(event) => handleInputChange(event)}
*/
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Grid>
                <Grid container justify="flex-start" className={classes.padding} spacing={3}>
                    {filter.map(item => (
                        <Grid item lg={3} key={item.id} >
                            <Card className={classes.root} >
                                <CardHeader
                                    title={
                                        item.name
                                    }
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={item.Image}
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Button variant="contained" color="primary"  component={Link} to={`/detail/${item.id}`}>
                                        DETAILS
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

