import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const PasswordInput = ({
  fullWidth, error, helperText, InputLabelProps, margin, value, onChange, label, variant, required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      margin={margin}
      value={value}
      onChange={onChange}
      label={label}
      variant={variant}
      required={required}
      InputLabelProps={InputLabelProps}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordInput.propTypes = {
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  InputLabelProps: PropTypes.objectOf(PropTypes.any),
  margin: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

PasswordInput.defaultProps = {
  fullWidth: false,
  error: false,
  helperText: '',
  InputLabelProps: {},
  margin: '',
  value: '',
  label: '',
  required: false,
};

export default PasswordInput;
