import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import makeStyles from "@material-ui/core/styles/makeStyles";
import BiancaVilsanescu from "../pagesCourses/BiancaVilsanescu";
import asyncR from "../utils/async";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    button: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        width: '100%',
        //color: 'white',
        //backgroundColor: '#0066CC',
        //color: '#FFFFFF',
        // height: 30,
        padding: '10px 0px',
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    marginTop:{
        marginTop: 12,
    },
    pop: {
        padding: '20px',


    },
}));


export default function AccountBotton(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const openPage = () => {
        props.changePage('account');
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        asyncR('/user/logout', {email: props.email}, (error, res) => {
            if (error) {
                // setError('Eroare la logare')
            } else {
                localStorage.clear();
                window.location.reload();
            }
        })
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                <AccountCircle/>
            </IconButton>
            <Popover
                     id={id}
                     classes={{paper:classes.pop}}
                     open={open}
                     anchorEl={anchorEl}
                     onClose={handleClose}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'center',
                     }}
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'center',
                     }}
            >
                <Button className={classes.button} variant='contained' color='primary' onClick={openPage}> Contul meu </Button>
                <Button className={clsx(classes.button, classes.marginTop)} variant='outlined' onClick={logout}> Delogare </Button>

            </Popover>
        </div>

    );
}


