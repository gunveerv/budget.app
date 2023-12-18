import React, { useState, useEffect } from 'react';
import '../App.css';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const isDEBUG = process.env.DEBUG;

const timeFilters = [
    "ALL",
    "1y",
    "1m",
    "1w",
    "1d"
];

const ButtonRow = ({ handleParentTimeFilter }) => {
    const [buttonData, setButtonData] = useState("ALL");

    useEffect(() => {

    }, []); //only on mount

    const onButtonClick = (value) => {
        setButtonData(value); 
        handleParentTimeFilter(value);      
    };

    return (
        <Box>
            <Stack spacing={2} direction="row" className="body">
                {timeFilters.map((time) => (
                    buttonData === time ? 
                    <Button key={time} variant="contained">{time}</Button> 
                    : <Button key={time} onClick={() => {onButtonClick(time)}} variant="outlined">{time}</Button> 
                ))}
            </Stack>
        </Box>
    );
};

export default ButtonRow;