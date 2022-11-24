import { FC, useContext, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Authentication, AuthenticationContext } from './contexts/authentication';
import { FeaturesContext } from './contexts/features';
import { RequireAuthenticated, RequireUnauthenticated } from './components';

import SignIn from './SignIn';
import AuthenticatedRouting from './AuthenticatedRouting';

const RootRedirect = ({ message, variant, signOut }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    signOut && authenticationContext.signOut(false);
    enqueueSnackbar(message, { variant });
  }, [message, variant, signOut, authenticationContext, enqueueSnackbar]);
  return (<Navigate to="/" />);
};

export const RemoveTrailingSlashes = () => {
  const location = useLocation();
  return location.pathname.match('/.*/$') && (
    <Navigate
      to={{
        pathname: location.pathname.replace(/\/+$/, ""),
        search: location.search
      }}
    />
  );
};

const AppRouting = () => {
  const { features } = useContext(FeaturesContext);

  return (
    <Authentication>
      <RemoveTrailingSlashes />
      <Routes>
        <Route
          path="/unauthorized"
          element={<RootRedirect message="Please log in to continue" signOut />}
        />
        <Route
          path="/firmwareUpdated"
          element={<RootRedirect message="Firmware update successful" variant="success" />}
        />
        {features.security &&
          <Route
            path="/"
            element={
              <RequireUnauthenticated>
                <SignIn />
              </RequireUnauthenticated>
            }
          />}
        <Route
          path="/*"
          element={
            <RequireAuthenticated>
              <AuthenticatedRouting />
            </RequireAuthenticated>
          }
        />
      </Routes>
    </Authentication>
  );
};

export default AppRouting;
