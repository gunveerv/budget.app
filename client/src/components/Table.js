import React, { useState, useEffect } from 'react';
import '../App.css';
import { Box } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid'; //TODO

const isDEBUG = process.env.DEBUG;

const Table = () => {

const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(true);

const columns = [
  { field: 'Name', headerName: 'Name', width: 150 },
  { field: 'category', headerName: 'Category', width: 250 },
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
  }
};
  
useEffect(() => {

  fetchRecords();
}, []); // Run once when the component mounts

    return (
        <Box className="body">
            <table>
            <thead>
                <tr>
                    <th className="table">Name</th>
                    <th className="table">Category</th>
                    <th className="table">Cost</th>
                    <th className="table">Date</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record._id}>
                        <td className="table">{record.name}</td>
                        <td className="table">{record.category}</td>
                        <td className="table">{record.cost}</td>
                        <td className="table">{record.date.split('T')[0]}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Box>
    );
};

export default Table;