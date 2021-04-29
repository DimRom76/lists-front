import React, { useState } from 'react';

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

function PasswordForm({ handleChange, label, name, error, helperText, value }) {
  const [hidePassword, setHidePassword] = useState(true);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <TextField
      style={{ marginTop: 10 }}
      fullWidth
      id={name}
      name={name}
      label={label}
      type={hidePassword ? 'password' : 'input'}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      InputProps={
        hidePassword
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityOffTwoToneIcon
                    onClick={showPassword}
                    color="primary"
                  />
                </InputAdornment>
              ),
            }
          : {
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityTwoToneIcon
                    onClick={showPassword}
                    color="primary"
                  />
                </InputAdornment>
              ),
            }
      }
    />
  );
}

export default PasswordForm;
