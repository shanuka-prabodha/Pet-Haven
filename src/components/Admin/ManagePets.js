import React, {useState, useEffect} from "react";
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeletePet from "./DeletePet";
import UpdatePet from "./UpdatePet";
import {useHistory} from "react-router-dom";
import ViewOne from "./ViewOne";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
export default function ManagePets(props) {
    const history = useHistory();
    const classes = useStyles();

    const [petList, setPetList] = useState([]);

    useEffect(() => {

        function getPets() {
            axios.get("https://61139ba1cba40600170c1b2a.mockapi.io/pets/")
                .then((res) => {
                    setPetList(res.data)
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        getPets()
    }, [])


    return (
        <div className="admin-style">


            {
                petList.map(petList => (

                    <Card className={classes.root} style={{
                        display: "inline-block",
                        padding: '15px',
                        marginLeft: "20px",
                        width: "500px",
                        height: "400px",
                        marginTop: '5px'
                    }}>

                        <CardHeader

                            action={
                                <IconButton aria-label="settings">
                                    <ViewOne
                                        petID={petList.id}
                                        name={petList.name}
                                        description={petList.description}
                                        image={petList.image}
                                    />
                                </IconButton>
                            }
                        />
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={petList.image}
                                title={petList.name}

                            />

                            <CardContent>

                                <Typography gutterBottom variant="h5" component="h2">
                                    {petList.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {petList.description}
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <UpdatePet
                                petID={petList.id}
                                name={petList.name}
                                description={petList.description}
                                user={props.user}
                            />
                            <DeletePet
                                petID={petList.id}
                                user={props.user}
                            />
                        </CardActions>


                    </Card>

                ))


            }

        </div>
    )
}