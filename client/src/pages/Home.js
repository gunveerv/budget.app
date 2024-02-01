import React, { useState } from 'react';
import '../App.css';
import Form from '../components/Form';
import Table from '../components/Table';
import ButtonRow from '../components/ButtonRow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function Home() {
  const [refreshData, setRefreshData] = useState(false);
  const [timeFilter, setTimeFilter] = useState("ALL");

  const handleFormSubmit = (bool) => {
    // Set refreshData to bool to trigger a re-fetch in the Table component
    setRefreshData(bool);
  };

  const handleParentTimeFilter = (time) => {
    setTimeFilter(time);
  };

  return (
    <div className="Home">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table refreshData={refreshData} updateRefresh={handleFormSubmit} timeFilter={timeFilter}/>
        <ButtonRow handleParentTimeFilter={handleParentTimeFilter}/>
        <Form onFormSubmit={handleFormSubmit}/>
      </LocalizationProvider>
    </div>
  );
}

export default Home;
