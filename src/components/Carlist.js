import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCar from './AddCar';
import SimpleSnackbar from "./SimpleSnackbar";
import DeleteCar from "./DeleteCar";
import EditCarButton from './EditCarButton';



export default function Carlist() {
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchData(), []);



    const fetchData = (data) => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    };


    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };



    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)

        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    };

    
    const deleteCar = (deleteCar, link) => {
     
        fetch(link, {
             method: "DELETE" 
            }).then((response) => {
            if (response.ok) {
                fetchData();
            }
        });
    }

    const [columnDefs, setColumnDefs] = useState([
            { field: "brand", sortable: true, filter: true, },
            { field: "model", sortable: true, filter: true },
            { field: "color", sortable: true, filter: true },
            { field: "fuel", sortable: true, filter: true },
            { field: "year", sortable: true, filter: true },
            { field: "price", sortable: true, filter: true },
           
            {
                headerName: "",
                width: 100,
                field: "_links.self.href",
                cellRenderer: (params) => (
                    <EditCarButton updateCar={updateCar} params={params} />
                ),
            },
            {
                headerName: "",
                width: 100,
                field: "_links.self.href",
                cellRenderer: (params) => (
                    <DeleteCar deleteCar={deleteCar} params={params} />
                ),
            },
        ]);
    
    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%' }}>
            <AddCar saveCar={saveCar} />
            <AgGridReact
                
                filterable={true}
                onGridReady={params => gridRef.current = params.api}
                ref={gridRef}
                rowSelection="single"
                rowData={cars}
                columnDefs={columnDefs}

            > 
                
            </AgGridReact>
            <SimpleSnackbar />
        </div>
    );
}