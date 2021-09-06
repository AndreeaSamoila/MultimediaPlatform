import React from 'react';
import Typography from '@material-ui/core/Typography';
import Meetings from '../meetings/Meetings';

import makeStyles from '@material-ui/core/styles/makeStyles';
import background from '../assets/elearningbackground.jpeg'
import Paper from "@material-ui/core/Paper";
import background2 from "../assets/fundal.jpg";
import background3 from "../assets/fundal-1.jpg";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';


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
    continutShadow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        minHeight: '300px',
        padding: '20px',
        width: '400px',
        fontSize: '20px',
        background: '#FFF',
        color: 'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
        margin: '25px 50px 75px 100px',
        textAlign: 'center',
        justifyContent: 'top',
    },
    continutShadow2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '900px',
        minHeight: '400px',
        backgroundSize: 'cover',
        background: `url(${background2})`,
        padding: '20px',
        width: '1000px',
        fontSize: '20px',
        color: 'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        boxSizing: 'border-box',
        margin: '25px 50px 75px 100px',
        textAlign: 'center',
        justifyContent: 'bottom',
        },
    paper: {
        width: '100%',
        padding: 30,
        marginTop: theme.spacing(8),
        display: 'cover',
        flexDirection: 'column',
        alignItems: 'center',
        textIndent: '50px',
        textAlign: 'justify',
        border: '1px 1px solid gray',
        boxShadow: '0 4px 8px 0 rgba(0.2, 0.2, 0.2, 0.2), 0 6px 20px 0 rgba(0.19, 0, 0, 0.19)',
        fontSize: '30px',
        background: `url(${background3})`,

    },

}));
function MyAccount(props) {
    const classes = useStyles();
    return (

        <Paper>
            <Typography>
                <Paper className={classes.paper}>
                    <b>{'Email: ' + props.email || ''}</b>
                    <br/>
                    {'Nume de Utilizator: ' + props.fullName || ''}
                    <br/>
                    {'Id: ' + props.idUtilizator || ''}

                </Paper>
            </Typography>

            <Paper className={classes.paper}>
            <Meetings userId={props.idUtilizator}/>
            </Paper>
        </Paper>
    );
}

export default MyAccount;
