import React, {useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useHistory} from "react-router-dom";


const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '100px',
    boxShadow: '0px 0px 4px #FA334E'
}

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const inputFieldUseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '35ch',

    },
}));


//snack Bar styles

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Signin(props) {
    const classes = inputFieldUseStyles();

    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');


    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);

    //dialog window
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //snack Bar
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        if (username == '' && password == '') {
            setHelperText('please fill all the fields');
            setError(false);
        } else if (username == '') {
            setHelperText('please fill email');
            setError(false);
        } else if (password == '') {
            setHelperText('please fill the password');
            setError(false);
        } else {
            onSubmit(event)
        }
    };

    const history = useHistory();

    function onSubmit(e) {

        e.preventDefault()


        setOpen(false);
        setOpenSnack(true);
        setTimeout(() => {
            history.push('/admin')
        }, 1000)

    }


    return (
        <div className='ad-pet'>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Sign IN Successfully!
                </Alert>
            </Snackbar>

            <Button variant="contained" style={buttonStyle} onClick={handleClickOpen}>ADMIN</Button>


            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    ADMIN SIGN IN
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <Typography>

                            <TextField
                                type="email"
                                name="username"
                                label="Enter Any Email"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                onChange={(event) => {
                                    setHelperText(' ');
                                    setError(false);
                                    setUsername(event.target.value)
                                }}
                            />
                            <br/><br/>
                            <TextField

                                type='password'
                                name="password"
                                label="Enter Any Password"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                onChange={(event) => {
                                    setHelperText(' ');
                                    setError(false);
                                    setPassword(event.target.value)
                                }}
                            />

                            <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            SIGN IN
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
            <br/><br/><br/>

        </div>
    )
}