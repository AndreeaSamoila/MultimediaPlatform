import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import background from '../assets/elearningbackground.jpeg'
import Paper from "@material-ui/core/Paper";
import asyncR from '../utils/async';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '160px',
        paddingBottom: '160px',
        top: '50%',
        margin: '0px',
        bottom: '50%',

    },
    paper: {
        width: 400,
        padding: 30,
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
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
    error: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 16,
    },
    icon: {
        verticalAlign: 'bottom',
        marginRight: 2,
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                iLearning.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Login(props) {
    const classes = useStyles();

    const [email, setEmail] = useState(''); //se creeaza un state cu un email in aceasta functie
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = () => {
        asyncR('/user/login', { email, password }, (error, res) => { //trimite un request la server si da ca param emial % parola
            if (error) {
                setError('Eroare la logare')
            } else {
                const user = JSON.parse(res); //json=
                console.log('User',user);
                props.setUserInfo(email, user.fullName, user.cod);
                props.changePage('account');
            }
        })
    }
    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <h1>Autentificare</h1>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Parola"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Conectează-te
                    </Button>
                    {error && <Typography className={classes.error} color="error" variant="caption">
                        <ErrorOutline className={classes.icon} /> {error}
                    </Typography>}

                </form>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Paper>
        </div>

    );
}

export default Login;
