/* eslint-disable react/prop-types */
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const StatesMenu = ({ values, handleChange }) => (
  <FormControl sx={{ m: 1, minWidth: '100%' }}>
    <InputLabel id="states-label">Estado</InputLabel>
    <Select
      labelId="states-label"
      value={values.state}
      onChange={handleChange('state')}
      label="Estado"
      required
    >
      <MenuItem value={0}>Estados</MenuItem>
      <MenuItem value={1}>Acre</MenuItem>
      <MenuItem value={2}>Alagoas</MenuItem>
      <MenuItem value={3}>Amazonas</MenuItem>
      <MenuItem value={4}>Amapá</MenuItem>
      <MenuItem value={5}>Bahia</MenuItem>
      <MenuItem value={6}>Ceará</MenuItem>
      <MenuItem value={7}>Distrito Federal</MenuItem>
      <MenuItem value={8}>Espírito Santo</MenuItem>
      <MenuItem value={9}>Goiás</MenuItem>
      <MenuItem value={10}>Maranhão</MenuItem>
      <MenuItem value={11}>Minas Gerais</MenuItem>
      <MenuItem value={12}>Mato Grosso do Sul</MenuItem>
      <MenuItem value={13}>Mato Grosso</MenuItem>
      <MenuItem value={14}>Pará</MenuItem>
      <MenuItem value={15}>Paraíba</MenuItem>
      <MenuItem value={16}>Pernambuco</MenuItem>
      <MenuItem value={17}>Piauí</MenuItem>
      <MenuItem value={18}>Paraná</MenuItem>
      <MenuItem value={19}>Rio de Janeiro</MenuItem>
      <MenuItem value={20}>Rio Grande do Norte</MenuItem>
      <MenuItem value={23}>Rio Grande do Sul</MenuItem>
      <MenuItem value={21}>Rondônia</MenuItem>
      <MenuItem value={22}>Roraima</MenuItem>
      <MenuItem value={24}>Santa Catarina</MenuItem>
      <MenuItem value={25}>Sergipe</MenuItem>
      <MenuItem value={26}>São Paulo</MenuItem>
      <MenuItem value={27}>Tocantins</MenuItem>
    </Select>
  </FormControl>
);

export default StatesMenu;
