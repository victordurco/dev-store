import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getResearchedProduct } from '../../../services/devStore.services';
import SearchOption from './SearchOption';

const SearchBox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    if (event.target.value.length >= 3) {
      setOptionsVisibility(true);
      getResearchedProduct({ name: event.target.value })
        .then((res) => {
          setFilteredProducts(res.data);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tivemos um problema com sua pesquisa :(',
          });
        });
    } else {
      setOptionsVisibility(false);
    }
  };

  const submitSearch = () => {
    const formatedSearch = search.replace(' ', '&');
    navigate(`/pesquisar/${formatedSearch}`);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',
      }}
      onSubmit={submitSearch}
    >
      <Wrapper>
        <InputWrapper>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquise seu produto..."
            inputProps={{ 'aria-label': 'pesquise seu produto....' }}
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setOptionsVisibility(true)}
            onBlur={() => setTimeout(() => setOptionsVisibility(false), 100)}
            fullWidth
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </InputWrapper>
        {filteredProducts.length > 0
          ? (
            <Options show={search.length >= 3 && optionsVisibility}>
              {filteredProducts.map((product) => (
                <SearchOption
                  key={product.id}
                  name={product.name}
                  photo={product.photo}
                  code={product.code}
                  setSearch={setSearch}
                />
              ))}
            </Options>
          )
          : (
            <NoOptions show={search.length >= 3 && optionsVisibility}>
              Nenhum resultado :(
            </NoOptions>
          )}

      </Wrapper>
    </Paper>
  );
};

export default SearchBox;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  div::-webkit-scrollbar {
    display: none;
}
`;

const InputWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
`;

const Options = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? '210px' : '0px')};
  border-radius: 5px;
  border: ${(props) => (props.show ? '1px #686868 solid' : 'none')};
  transition: 450ms ease-out;
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 1;
  overflow: hidden;
  overflow-y: auto;
`;

const NoOptions = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? '100px' : '0px')};
  transition: 450ms ease-out;
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 1;
  color: ${(props) => (props.show ? '#686868' : 'transparent')};
  border-radius: 5px;
  border: ${(props) => (props.show ? '1px #686868 solid' : 'none')};
  font-size: 30px;
  display:flex;
  justify-content: center;
  align-items: center;
`;
