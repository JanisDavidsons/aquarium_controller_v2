import React, { Fragment } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableFooter, 
  TableRow
  // withWidth, 
  // isWidthDown 
} from '@mui/material';
import { Box, Button, Typography, } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { withAuthenticatedContext } from '../authentication';
import { FormActions, FormButton, extractEventValue } from '../components';

import UserForm from './UserForm';

function compareUsers(a, b) {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
}

class ManageUsersForm extends React.Component {

  state = {
    creating: false
  };

  createUser = () => {
    this.setState({
      creating: true,
      user: {
        username: "",
        password: "",
        admin: true
      }
    });
  };

  uniqueUsername = (username) => {
    return !this.props.data.users.find(u => u.username === username);
  }

  noAdminConfigured = () => {
    return !this.props.data.users.find(u => u.admin);
  }

  removeUser = (user) => {
    const { data } = this.props;
    const users = data.users.filter(u => u.username !== user.username);
    this.props.setData({ ...data, users });
  }

  startEditingUser = (user) => {
    this.setState({
      creating: false,
      user
    });
  };

  cancelEditingUser = () => {
    this.setState({
      user: undefined
    });
  }

  doneEditingUser = () => {
    const { user } = this.state;
    if (user) {
      const { data } = this.props;
      const users = data.users.filter(u => u.username !== user.username);
      users.push(user);
      this.props.setData({ ...data, users });
      this.setState({
        user: undefined
      });
    }
  };

  handleUserValueChange = (name) => (event) => {
    this.setState({ user: { ...this.state.user, [name]: extractEventValue(event) } });
  };

  onSubmit = () => {
    this.props.saveData();
    this.props.authenticatedContext.refresh();
  }

  render() {
    const { width, data } = this.props;
    const { user, creating } = this.state;
    return (
      <Fragment>
        <ValidatorForm onSubmit={this.onSubmit}>
          <Table 
          size="small" 
          // padding={isWidthDown('xs', width) ? "none" : "default"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="center">Admin?</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.sort(compareUsers).map(user => (
                <TableRow key={user.username}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="center">
                    {
                      user.admin ? <CheckIcon /> : <CloseIcon />
                    }
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" aria-label="Delete" onClick={() => this.removeUser(user)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small" aria-label="Edit" onClick={() => this.startEditingUser(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter >
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell align="center" padding="default">
                  <Button startIcon={<PersonAddIcon />} variant="contained" color="secondary" onClick={this.createUser}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {
            this.noAdminConfigured() &&
            (
              <Box bgcolor="error.main" color="error.contrastText" p={2} mt={2} mb={2}>
                <Typography variant="body1">
                  You must have at least one admin user configured.
                </Typography>
              </Box>
            )
          }
          <FormActions>
            <FormButton startIcon={<SaveIcon />} variant="contained" color="primary" type="submit" disabled={this.noAdminConfigured()}>
              Save
            </FormButton>
          </FormActions>
        </ValidatorForm>
        {
          user &&
          <UserForm
            user={user}
            creating={creating}
            onDoneEditing={this.doneEditingUser}
            onCancelEditing={this.cancelEditingUser}
            handleValueChange={this.handleUserValueChange}
            uniqueUsername={this.uniqueUsername}
          />
        }
      </Fragment>
    );
  }

}

export default withAuthenticatedContext(
  // withWidth()
  (ManageUsersForm)
  );
