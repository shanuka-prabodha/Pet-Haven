import React, {useState} from "react";
import axios from "axios"
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',

    },
}));


//snack Bar styles

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function UpdatePet(props) {

    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);

    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

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

    const classes = useStyles();


    // const [petName,setPetName] = useState("");
    // const [description,setDescription] = useState("");
    // const [image,setImage] = useState("");


    let petName = props.name;
    let description = props.description;

    const [data, setData] = useState({
        PetName: petName,
        PetDescription: description
    });


    function handleChange(event) {
        const {name, value} = event.target;
        setData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
        setHelperText(' ');
        setError(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (data.PetName == '' && data.PetDescription == '') {
            setHelperText('please fill all the fields');
            setError(false);
        } else if (data.PetName == '') {
            setHelperText('please Enter Pet Name');
            setError(false);
        } else if (data.PetDescription == '') {
            setHelperText('please Enter Description');
            setError(false);
        } else {
            onSubmit(event)
        }

    };

    function onSubmit(e) {
        e.preventDefault()

        const petObject = {
            name: data.PetName,
            description: data.PetDescription
        }

        axios.put(`https://61139ba1cba40600170c1b2a.mockapi.io/pets/${props.petID}`, petObject)
            .then(res => {
                setOpen(false);
                setOpenSnack(true);
                setTimeout(() => {
                    window.location.reload(true)
                }, 1000)
            })
            .catch(error => {
                alert(error)
            })

    }


    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="info">
                    Updated Successfully!
                </Alert>
            </Snackbar>
            <Button hidden={props.user == 'cus'} variant="outlined" size="small" color="primary"
                    onClick={handleClickOpen}>Update</Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Update Pet
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <Typography>
                            <label style={{marginLeft: "21px"}}>Enter Pet Name </label><br/>
                            <TextField
                                inputProps={{pattern: "[A-Za-z ]{1,75}"}}
                                type="text"
                                name="PetName"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                value={data.PetName}
                                onChange={handleChange}
                            /><br/><br/>

                            <label style={{marginLeft: "21px"}}>Enter Description </label><br/>
                            <textarea style={{width: "450px", height: "150px"}}
                                      type="text"
                                      label="Enter Description"
                                      name="PetDescription"
                                      className={classes.textField}
                                      variant="outlined"
                                      margin="dense"
                                      value={data.PetDescription}
                                      onChange={handleChange}
                            />

                            <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Update
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}