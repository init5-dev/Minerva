import TextField from '@mui/material/TextField';
import { Grid, MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";

export default function ConfDialog() {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (

    <Grid container>
      <Grid item xs={6}>
        <Stack direction='column' mx={1}>
          <TextField
            margin="dense"
            id="user-name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="user-age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
          />
          <Select
            labelId="user-gender-label"
            id="user-gender"
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
            sx={{ my: 1 }}
            color="primary"
          >
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
            <MenuItem value={30}>Other</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="user-birth-city"
            label="Birth City"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="current-city"
            label="Current city"
            type="text"
            fullWidth
            variant="outlined"
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack direction='column' mx={1}>
          <TextField
            margin="dense"
            id="user-religion"
            label="Religion"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="user-hobbies"
            label="Hobbies"
            type="text"
            fullWidth
            variant="outlined"
            multiline
          />
          <TextField
            margin="dense"
            id="user-activities"
            label="Favorite activities"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="user-values"
            label="Values"
            type="text"
            fullWidth
            variant="outlined"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
