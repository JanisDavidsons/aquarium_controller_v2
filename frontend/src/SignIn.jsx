import {useContext, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Fab, Paper, Typography } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';

import * as AuthenticationApi from './api/authentication';
import { PROJECT_NAME } from './api/env';
import { ValidatedTextField } from './components';
import { SIGN_IN_REQUEST_VALIDATOR, validate } from './validators';
import { extractErrorMessage, onEnterCallback, updateValue } from './utils';
import { AuthenticationContext } from './contexts/authentication';

const SignIn = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const { enqueueSnackbar } = useSnackbar();

  const [signInRequest, setSignInRequest] = useState({
    email: '',
    password: ''
  });
  const [processing, setProcessing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState();

  const updateLoginRequestValue = updateValue(setSignInRequest);

  const validateAndSignIn = async () => {
    setProcessing(true);
    try {
      await validate(SIGN_IN_REQUEST_VALIDATOR, signInRequest);
      signIn();
    } catch (errors) {
      setFieldErrors(errors);
      setProcessing(false);
    }
  };

  const signIn = async () => {
    try {
      const { data: loginResponse } = await AuthenticationApi.signIn(signInRequest);
      authenticationContext.signIn(loginResponse.token);
    } catch (error) {
      if (error.response?.status === 401) {
        enqueueSnackbar("Invalid login details", { variant: "warning" });
      } else {
        enqueueSnackbar(extractErrorMessage(error, "Unexpected error, please try again"), { variant: "error" });
      }
      setProcessing(false);
    }
  };

  const submitOnEnter = onEnterCallback(signIn);

  return (
    <Box
      display="flex"
      height="100vh"
      margin="auto"
      padding={2}
      justifyContent="center"
      flexDirection="column"
      maxWidth={(theme) => theme.breakpoints.values.sm}
    >
      <Paper
        sx={(theme) => ({
          textAlign: "center",
          padding: theme.spacing(2),
          paddingTop: "200px",
          backgroundImage: 'url("/app/icon.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% " + theme.spacing(2),
          backgroundSize: "auto 150px",
          width: "100%"
        })}
      >
        <Typography variant="h4">{PROJECT_NAME}</Typography>
        <ValidatedTextField
          fieldErrors={fieldErrors}
          disabled={processing}
          name="email"
          label="Email"
          value={signInRequest.email}
          onChange={updateLoginRequestValue}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <ValidatedTextField
          fieldErrors={fieldErrors}
          disabled={processing}
          type="password"
          name="password"
          label="Password"
          value={signInRequest.password}
          onChange={updateLoginRequestValue}
          onKeyDown={submitOnEnter}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Fab variant="extended" color="primary" sx={{ mt: 2 }} onClick={validateAndSignIn} disabled={processing}>
          <ForwardIcon sx={{ mr: 1 }} />
          Sign In
        </Fab>
      </Paper>
    </Box>
  );
};

export default SignIn;
