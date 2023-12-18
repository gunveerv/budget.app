import React, { useState, useEffect } from 'react';
import '../App.css';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const isDEBUG = process.env.DEBUG;

const Table = ({ refreshData, updateRefresh, timeFilter }) => {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'name', headerName: 'Name', width: 250,  wrap: true },
    { field: 'category', headerName: 'Category', width: 250,  wrap: true },
    { field: 'cost', headerName: 'Cost', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  const timeFilterURL = (time) => {

    const currDate = new Date();
    const startDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    switch(time) {
      case 'ALL':
      return '';
    case '1y':
      startDate.setFullYear(startDate.getFullYear() - 1);
      return `?startDate=${startDate.toISOString()}&endDate=${currDate.toISOString()}`;
    case '1m':
      startDate.setMonth(startDate.getMonth() - 1);
      return `?startDate=${startDate.toISOString()}&endDate=${currDate.toISOString()}`;
    case '1w':
      startDate.setDate(startDate.getDate() - 7);
      return `?startDate=${startDate.toISOString()}&endDate=${currDate.toISOString()}`;
    case '1d':
      startDate.setDate(startDate.getDate() - 1);
      return `?startDate=${startDate.toISOString()}&endDate=${currDate.toISOString()}`;
    default:
      console.log('Invalid time filter');
    }

  };
    
  useEffect(() => {
    const fetchRecords = async () => {
      const dateFilterQuery = timeFilterURL(timeFilter);
      try {
        const response = await fetch('http://10.0.0.244:8080/api/record'+dateFilterQuery);
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
        updateRefresh(false);
      }
    };
    fetchRecords();
  }, [refreshData, timeFilter]); // Run once when the component mounts

      return (
        <Box className="table" style={{ 
          height: '60vh', 
          width: '100%', 
          margin: 'auto', 
          marginTop: "3%",
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
            pageSizeOptions={[5, 10, 25, 50]}
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