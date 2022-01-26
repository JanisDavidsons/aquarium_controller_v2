import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { withStyles, createStyles } from '@mui/material/styles';
import { Paper, Typography, Fab } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';

import { withAuthenticationContext } from './authentication/AuthenticationContext';
import {PasswordValidator} from './components';
import { PROJECT_NAME, SIGN_IN_ENDPOINT } from './api';

const styles = (theme) => createStyles({
  signInPage: {
    display: "flex",
    height: "100vh",
    margin: "auto",
    padding: theme.spacing(2),
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: theme.breakpoints.values.sm
  },
  signInPanel: {
    textAlign: "center",
    padding: theme.spacing(2),
    paddingTop: "200px",
    backgroundImage: 'url("/app/icon.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% " + theme.spacing(2) + "px",
    backgroundSize: "auto 150px",
    width: "100%"
  },
  extendedIcon: {
    marginRight: theme.spacing(0.5),
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  }
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      processing: false
    };
  }

  updateInputElement = (event) => {
    const { name, value } = event.currentTarget;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  };

  onSubmit = () => {
    const { username, password } = this.state;
    const { authenticationContext } = this.props;
    this.setState({ processing: true });
    fetch(SIGN_IN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw Error("Invalid credentials.");
        } else {
          throw Error("Invalid status code: " + response.status);
        }
      }).then(json => {
        authenticationContext.signIn(json.access_token);
      })
      .catch(error => {
        this.props.enqueueSnackbar(error.message, {
          variant: 'warning',
        });
        this.setState({ processing: false });
      });
  };

  render() {
    const { username, password, processing } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.signInPage}>
        <Paper className={classes.signInPanel}>
          <Typography variant="h4">{PROJECT_NAME}</Typography>
          <ValidatorForm onSubmit={this.onSubmit}>
            <TextValidator
              disabled={processing}
              validators={['required']}
              errorMessages={['Username is required']}
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              value={username}
              onChange={this.updateInputElement}
              margin="normal"
              inputProps={{
                autoCapitalize: "none",
                autoCorrect: "off",
              }}
            />
            <PasswordValidator
              disabled={processing}
              validators={['required']}
              errorMessages={['Password is required']}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={this.updateInputElement}
              margin="normal"
            />
            <Fab variant="extended" color="primary" className={classes.button} type="submit" disabled={processing}>
              <ForwardIcon className={classes.extendedIcon} />
              Sign In
            </Fab>
          </ValidatorForm>
        </Paper>
      </div>
    );
  }

}

export default withAuthenticationContext(withSnackbar(withStyles(styles)(SignIn)));
