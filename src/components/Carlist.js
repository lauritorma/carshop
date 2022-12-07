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

    const rowDataGetter = function (params) {
        return params.data;
    };

    const rowDataGetter2 = function (params) {
        return params.data._links.car.href;
    };
    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%' }}>
            <AddCar saveCar={saveCar} />
            <DeleteCar fetchData= {fetchData} />
            <AgGridReact
                
                filterable={true}
                onGridReady={params => gridRef.current = params.api}
                ref={gridRef}
                rowSelection="single"
                rowData={cars}
                Components={{
                    cellRenderer: DeleteCar, EditCarButton,
                    
                }}
            >
                <AgGridColumn headerName="Brand" field="brand" filter="agTextColumnFilter"></AgGridColumn>
                <AgGridColumn headerName='Model' field='model' filter='agTextColumnFilter'></AgGridColumn>
                <AgGridColumn headerName='Color' field='color' filter='agTextColumnFilter'></AgGridColumn>
                <AgGridColumn headerName='Fuel' field='fuel' filter='agTextColumnFilter'></AgGridColumn>
                <AgGridColumn headerName='Year' field='year' filter='agNumberColumnFilter'></AgGridColumn>
                <AgGridColumn headerName='Price' field='price' filter='agNumberColumnFilter'></AgGridColumn>
                <AgGridColumn headerName='' field='_links.self.href' cellRenderer={DeleteCar}></AgGridColumn>
                <AgGridColumn headerName='' field='' cellRenderer={EditCarButton} valueGetter={rowDataGetter}/>
                
            </AgGridReact>
            <SimpleSnackbar />
        </div>
    );
}