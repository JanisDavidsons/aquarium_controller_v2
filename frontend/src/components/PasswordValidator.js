import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

import { withStyles, createStyles } from '@mui/styles';
import { InputAdornment, IconButton } from '@mui/material';
import {Visibility,VisibilityOff } from '@mui/icons-material';

const styles = createStyles({
  input: {
    "&::-ms-reveal": {
      display: "none"
    }
  }
});

class PasswordValidator extends React.Component {

  state = {
    showPassword: false
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <TextValidator
        {...rest}
        type={this.state.showPassword ? 'text' : 'password'}
        InputProps={{
          classes,
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.toggleShowPassword}
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
        }}
      />
    );
  }

}

export default withStyles(styles)(PasswordValidator);
