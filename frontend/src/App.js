import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

import services from './services'
import './App.css';
import logo from './logo.svg';
import CustomMuiTheme from './CustomMuiTheme';

function App() {

  const unauthorizedRedirect = () => <Redirect to="/" />;
  const [values, setValues] = useState({ entity: '', data: [], newEntity: '' })
  const [isCeateModalVisible, setCreateModalVisible] = useState( false )
  const [isLoading, setLoading] = useState( false )
  const [isSaving, setSaving] = useState( false )

  notistackRef = React.createRef();

  useEffect(()=> {
    document.title = PROJECT_NAME;
  });

  onClickDismiss = (key) => () => {
    notistackRef.crrent.cloceSnackBar(key);
  }

  async function handleSubmit( e ) {
    e.preventDefault()

    setLoading(true)
    const entities = await services.searchEntities( values.entity )
    setLoading(false)

    console.log(entities);
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
            <Switch>
              <Route exact path="/unauthorized" component={unauthorizedRedirect} />
              <Route component={AppRouting} />
            </Switch>
          </FeaturesWrapper>
        </SnackbarProvider>
    </CustomMuiTheme>
  );
}

export default App;
