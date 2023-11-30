import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  return (
    <div className="App">
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="name" variant="outlined" />
      <TextField id="outlined-basic" label="category" variant="outlined" />
      <TextField id="outlined-basic" label="cost" variant="outlined" />
      <TextField id="outlined-basic" label="date" variant="outlined" />
    </Box>
    </div>
  );
}

export default App;
