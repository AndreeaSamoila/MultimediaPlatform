import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import withStyles from '@material-ui/core/styles/withStyles';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const styles = {
    success: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        marginRight: 8,
    },
    message: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    snackbarContent: {
        alignItems: 'center',
        display: 'flex',
        margin: 8,
    },
};

const VARIANT_ICON = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const ANCHOR_ORIGIN = {
    vertical: 'bottom',
    horizontal: 'right',
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class SnackbarW extends React.PureComponent {
    render() {
        const {variant, message, classes, onClose, ...other} = this.props;
        const Icon = VARIANT_ICON[variant];

        return (
            <Snackbar anchorOrigin={ANCHOR_ORIGIN} autoHideDuration={6000} {...other}>
                <SnackbarContent
                    className={clsx(classes[variant], classes.snackbarContent)}
                    message={
                        <div className={classes.message}>
                            <Icon className={clsx(classes.icon, classes.iconVariant)} />
                            {message}
                        </div>
                    }
                    action={
                        <IconButton color="inherit" onClick={onClose}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    }
                />
            </Snackbar>
        );
    }
}

// =====================================================================================================================
//  D E F I N I T I O N
// =====================================================================================================================
export default withStyles(styles, {name: 'SnackbarW'})(SnackbarW);
