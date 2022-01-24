import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

import AppRouting from './AppRouting';
import { PROJECT_NAME } from './api';
import CustomMuiTheme from './CustomMuiTheme';
import FeaturesWrapper from './features/FeaturesWrapper';


function App() {

  const unauthorizedRedirect = () => <Navigate to="/" />;

  const notistackRef = React.createRef();

  useEffect(()=> {
    document.title = PROJECT_NAME;
  });

  const onClickDismiss = (key) => () => {
    notistackRef.crrent.cloceSnackBar(key);
  }

  return (
    <CustomMuiTheme>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          ref={notistackRef}
          action={(key) => (
            <IconButton onClick={onClickDismiss(key)} size="small">
              <CloseIcon />
            </IconButton>
          )}>
          <FeaturesWrapper>
            <Routes>
              <Route exact path="/unauthorized" component={unauthorizedRedirect} />
              <Route component={AppRouting} />
            </Routes>
          </FeaturesWrapper>
        </SnackbarProvider>
    </CustomMuiTheme>
  );
}

export default App;
