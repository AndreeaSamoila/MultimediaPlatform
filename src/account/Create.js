import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import asyncR from '../utils/async';
import {FormControl, InputLabel, MenuItem, Paper} from '@material-ui/core';
import background from '../assets/elearningbackground.jpeg';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        paddingTop: '160px',
        paddingBottom: '160px',
        top: '50%',
        margin: '0px',
        bottom: '50%',
    },
    paper: {
        marginTop: theme.spacing(8),
        width: 400,
        padding: 30,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Create(props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [tipUtilizator, setUser] = useState( '');
    const classes = useStyles();
    // const createAccount = () => {
    //     const response = Axios.post('/auth', {name, email, password})
    // }

    const handleSubmit = () => {
        asyncR('/user/create', { fullName, email, password, tipUtilizator }, (error, res) => {
            if (error) {
                setError(JSON.parse(res));
            } else {
                props.changePage('login');
            }
        })
    }

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <b>Înregistrare</b>
                </Typography>
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresă de email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Parolă"
                        id="password"
                        type='password'
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nume"
                        label="Nume de Utilizator"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                    {error && <Typography color='error'>{error}</Typography>}
                    <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Tip Utilizator</InputLabel>
                        <Select
                            value={tipUtilizator}
                            onChange={handleChange}
                        >
                            <MenuItem value='profesor'>Profesor</MenuItem>
                            <MenuItem value='elev'>Elev</MenuItem>

                        </Select>
                    </FormControl>
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Înscrie-te
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Paper>
        </div >
    );
}

export default Create;