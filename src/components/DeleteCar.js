import React from "react";
import Button from '@mui/material/Button';

export default function DeleteCar ({deleteCar, params}) {
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
     })
     
    const handleClick = () => {
        if(window.confirm('Are you sure you want to delete this car?')){
        deleteCar(car, params.value);
    }
}
    return (
        <div>
            <Button color="error" onClick={handleClick}>Delete</Button>
        </div>
    )
}