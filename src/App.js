import React from 'react';
import './App.css';
import Carlist from './components/Carlist';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';


function App() {
  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CarShop!
          </Typography>
        </Toolbar>
      </AppBar>
     <Carlist />
    </div>
  );
}

export default App;
