import React, {useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import fetchData from './Carlist';


export default function EditCarButton (props) {

    
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    })

    const handleClickOpen = () => {
        console.log(props.data);
         setCar({brand: props.value.brand, model: props.value.model, color: props.value.color,
                 fuel: props.value.fuel, year: props.value.year, price: props.value.price })
         setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value })
    }

    const updateCar = (data) => {
        console.log(props.data._links.car.href);
        fetch(props.data._links.car.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)

        })
        
        .then(res => props.fetchData(data))
        .catch(err => console.error(err))
        handleClose();
    };

    return (
        <div>
            <Button color="secondary" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        label="Year"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={updateCar}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}