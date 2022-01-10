import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { useContext } from 'react';
import AllBreeds from '../context/DataContext';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const MultiSelector = () => {
    const [personName, setPersonName] = useState([]);
    const context = useContext(AllBreeds);
    const { message } = context;

    if (!message) return null

    const breeds = Object.keys(message);

    const handleChange = (event) => {
        const { target: { value }, } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>

            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Raza</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {breeds.map((b) => (
                        <MenuItem key={b} value={b}>
                            <Checkbox checked={personName.indexOf(b) > -1} />
                            <ListItemText primary={b} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </>
    );
}

export default MultiSelector