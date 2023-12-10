import React, { useState, useEffect } from 'react';
import '../App.css';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; //TODO

const isDEBUG = process.env.DEBUG;

const Table = () => {

const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(true);

const columns = [
  { field: 'name', headerName: 'Name', width: 250,  wrap: true },
  { field: 'category', headerName: 'Category', width: 250,  wrap: true },
  { field: 'cost', headerName: 'Cost', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
];

const fetchRecords = async () => {
  try {
    const response = await fetch('http://10.0.0.244:8080/api/record');
    const data = await response.json();
    setRecords(data);
  } catch (error) {
    console.error('Error fetching records:', error);
  } finally {
    setLoading(false);
    console.log(records);
  }
};
  
useEffect(() => {
  fetchRecords();
}, []); // Run once when the component mounts

    return (
      <Box className="table" style={{ 
        height: '60vh', 
        width: '75%', 
        margin: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}>
        <DataGrid
          rows={records}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          // checkboxSelection
          getRowId={(row) => row._id}
          cellClassName={(params) =>
            `custom-cell ${params.field}-${params.value}`
          }
        />
      </Box>
    );
};

export default Table;