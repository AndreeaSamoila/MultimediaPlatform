import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBarMui from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import AccountBotton from "../account/AccountBotton";


const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
    sectionDesktop: {
        display: 'flex',
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    subnavBtn: {
        backgroundColor: 'none',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        padding: '14px 16px',
        hover: 'black',
        position: 'relative',
       
    },
    
    dashButton: {
        color: 'white',
        textTransform: 'none',
    }
}));


function AppBar(props) {
    const classes = useStyles();



    return <div >
        <AppBarMui position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.openDrawer}
                >
                    <MenuIcon />
                </IconButton>

                <Button className={classes.dashButton}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        iLearning
                    </Typography>
                </Button>


                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>

                    <AccountBotton
                        changePage={props.changePage} //ii trimit componentei accountBotton prin props functia changePage venita de la parinte (app)
                        email={props.email}
                    >
                    </AccountBotton>


                </div>
            </Toolbar>
        </AppBarMui>
    </div>
};



export default AppBar;
