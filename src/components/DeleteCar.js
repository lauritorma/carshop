import React from "react";
import Button from '@mui/material/Button';

export default function DeleteCar (props) {

    const handleClick = (data) => {
        if(window.confirm('Are you sure you want to delete this car?')){
        console.log(props.value);
        fetch(props.value, {method: 'DELETE'}).
        then(res => props.fetchData(data))
        .catch(err => console.error(err))
    }
}
    return (
        <div>
            <Button color="error" onClick={handleClick}>Delete</Button>
        </div>
    )
}