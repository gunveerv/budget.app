import React, { useState, useEffect } from 'react';
import '../App.css';
import { Box } from '@mui/material';

const isDEBUG = process.env.DEBUG;

const Table = () => {

const [records, setRecords] = useState([]);
  
useEffect(() => {
  const fetchRecords = async () => {
    try {
      const response = await fetch('http://10.0.0.244:8080/api/record');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  fetchRecords();
}, []); // Run once when the component mounts

    return (
        <Box className="body">
            <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record._id}>
                        <td>{record._id}</td>
                        <td>{record.name}</td>
                        <td>{record.category}</td>
                        <td>{record.cost}</td>
                        <td>{record.date}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Box>
    );
};

export default Table;