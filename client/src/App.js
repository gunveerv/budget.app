import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const [refreshData, setRefreshData] = useState(false);

  const handleFormSubmit = (bool) => {
    // Set refreshData to bool to trigger a re-fetch in the Table component
    setRefreshData(bool);
  };

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table refreshData={refreshData} updateRefresh={handleFormSubmit}/>
        <Form onFormSubmit={handleFormSubmit}/>
      </LocalizationProvider>
    </div>
  );
}

export default App;
