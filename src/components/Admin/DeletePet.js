import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


//snack Bar styles

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBarUseStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function DeletePet(props) {

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


    const deletePet = () => {
        axios.delete(`https://61139ba1cba40600170c1b2a.mockapi.io/pets/${props.petID}`)
            .then(() => {
                setOpen(false);
                setOpenSnack(true);
                setTimeout(() => {
                    window.location.reload(true)
                }, 2000)
            })
    }


    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="error">
                    Deleted Successfully!
                </Alert>
            </Snackbar>

            <Button hidden={props.user == 'cus'} variant="outlined" size="small" color="secondary"
                    onClick={handleClickOpen}>Delete</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{
                    backgroundColor: "#ff0909",

                }}>{" Are You Sure Want to Delete This ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        After deleting this you can not get it again !!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={() => deletePet()} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}