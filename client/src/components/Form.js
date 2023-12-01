import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Box, FormControl, InputLabel, TextField } from '@mui/material';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        cost: '', //number
        date: '', //date
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
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
            
            setCategories(categoriesArray); // Update state with fetched categories
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic here, e.g., API call, etc.
        console.log('Form submitted with data:', formData);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
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
                <MenuItem key={category.value} value={category.label}>
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
            <TextField
                label="Date"
                variant="outlined"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
        </FormControl>

        {/* Submit button */}
        <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
            Submit
            </Button>
        </Box>
        </form>
    );
};

export default Form;
