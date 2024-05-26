import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const isDEBUG = process.env.DEBUG;

const Table = ({ refreshData, updateRefresh, timeFilter }) => {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [alert, setAlert] = useState(false);
  const timeoutRef = useRef(null);
  
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

  const dateStringFilter = (data) => {
    data.forEach((record) => record.date = new Date(record.date).toDateString());
    return data;
  };

  const getRecords = async () => {
    const dateFilterQuery = timeFilterURL(timeFilter);
    try {
      const response = await fetch('http://10.0.0.244:8080/api/record'+dateFilterQuery);
      const data = await response.json();
      dateStringFilter(data);
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } 
  };

  const onDeleteButtonClick = async () => {
    try {
      const body = {
        ids: selectedRows
      };
      await fetch('http://10.0.0.244:8080/api/record', 
      { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }, );
    } catch (error) {
      console.error('Error fetching records:', error);
    } 
    getRecords();
    setAlert(true);

    // After timeout set the show value to false
    timeoutRef.current = setTimeout(() => {
        setAlert(false);
    }, 3000);
};

  useEffect(() => {
    const fetchRecords = async () => {
      const dateFilterQuery = timeFilterURL(timeFilter);
      try {
        const response = await fetch('http://10.0.0.244:8080/api/record'+dateFilterQuery);
        const data = await response.json();
        dateStringFilter(data);
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
        updateRefresh(false);
      }
    };
    fetchRecords();
  }, [refreshData, timeFilter, updateRefresh]); // Run once when the component mounts

      return (
        <>
        <Box className="table" style={{ 
          height: '60vh', 
          width: '100%', 
          margin: 'auto', 
          marginTop: "3%",
          marginBottom: "1%",
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
            getRowId={(row) => row._id}
            cellClassName={(params) =>
              `custom-cell ${params.field}-${params.value}`
            }
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setSelectedRows(newRowSelectionModel)
            }}
          />
        </Box>
        {/* Delete Button */}
        { selectedRows.length > 0 && 
          <div>
            <Button variant="contained" className="button" color="error" onClick={() => {onDeleteButtonClick()}}>
              Delete {selectedRows.length} row(s) 
            </Button> 
          </div>
        }
        {alert ?
                <Alert 
                    variant="outlined" 
                    severity="success" 
                    size="small" 
                    style={{
                        width:'15%', 
                        margin: 'auto', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                      }}>
                    Deleted Entry Successfully!
                </Alert> 
                : null
              }
        </>
      );
};

export default Table;