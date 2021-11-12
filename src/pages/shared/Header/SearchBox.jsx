import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => (
  <Paper
    component="form"
    sx={{
      p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Pesquise seu produto..."
      inputProps={{ 'aria-label': 'pesquise seu produto....' }}
      fullWidth
    />
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);

export default SearchBox;
