import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table />
        <Form />
      </LocalizationProvider>
    </div>
  );
}

export default App;
