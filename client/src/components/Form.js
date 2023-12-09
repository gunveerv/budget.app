import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Box, FormControl, InputLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';

const isDEBUG = process.env.DEBUG;

const Form = () => {
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const { register, handleSubmit } = useForm();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        cost: '', //number
        date: '', //date
    });

    const defaultData = {
        name: '',
        category: '',
        cost: '',
        date: '',
    }

    useEffect(() => {
        let isMounted = true;
        // Fetch categories from the API
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://10.0.0.244:8080/api/categories', {
                method: 'GET',
              });
            const data = await response.json();
            
            // Convert the object into an array of key-value pairs
            const categoriesArray = Object.entries(data).map(([value, label]) => ({
                value,
                label,
            }));

            // Update state with fetched categories
            if (isMounted) {
                setCategories(categoriesArray);
            }
            
          } catch (error) {
            console.error('Error fetching categories:', error);
          } finally {
            if (isMounted) {
                setLoading(false);
            }
          }
        };
    
        fetchCategories();

        return () => {
            isMounted = false; // Component unmounted, update the variable
        };
    }, []);


    const handleChange = (event) => {
        const { name, value } = event.target;

        // Use a regular expression to only allow numeric input for the 'age' field
        const fieldValue = name === 'cost' ? value.replace(/[^0-9.]|\.(?![0-9]{0,2}$)/g, '') : value;

        setFormData({
        ...formData,
        [name]: fieldValue,
        });
    };

    const handleDateChange = (date) => {
        // Ensure date is a valid Date object
        if (!isNaN(date)) {
            setFormData({
                ...formData,
                date: date.toISOString(),
            });
        }
      };

    const onSubmit = async (event) => {
        // event.preventDefault();
        try {
            const response = await fetch('http://10.0.0.244:8080/api/record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
            const data = await response.json();

            setAlert(true);

            // After 3 seconds set the show value to false
            const timeId = setTimeout(() => {
                setAlert(false);
                const reloadId = setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            }, 2000);

            if (isDEBUG) {
                console.log('Sent a POST with data: ', JSON.stringify(formData));
                console.log('Response Receieved: ', data);
            }
            
          } catch (error) {
            console.error('Error sending POST to a record: ', error);
          }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Form Fields */}
        <FormControl>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
        </FormControl>

        <FormControl
            style={{ minWidth: "10%" }}>
            <InputLabel htmlFor="category">
                Category
            </InputLabel>
            <Select
                label="Category"
                variant="outlined"
                name="category"
                value={formData.category}
                onChange={handleChange}
            >   
                {categories.map((category) => (
                <MenuItem key={category.label} value={category.label}>
                {category.label}
                </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl>
            <TextField
                type="text"
                inputMode="numeric"
                label="Cost"
                variant="outlined"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
            />
        </FormControl>

        <FormControl>
            <DatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={formData.date}
                name="date"
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
        </FormControl>

        {/* Submit button */}
        <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading || JSON.stringify(formData) === JSON.stringify(defaultData)}>
            Submit
            </Button>
            {alert ?
                <Alert variant="outlined" severity="success" size="small">Successfully Uploaded!</Alert> 
                : null
            }
        </Box>
        </form>
    );
};

export default Form;
