import React, { useState, useEffect } from 'react';

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { BlockFormControlLabel, ValidatedPasswordField, ValidatedTextField } from '../../components';
import { validate } from '../../validators';
import { updateValue } from '../../utils';

const UserForm = ({ creating, validator, user, setUser, onDoneEditing, onCancelEditing }) => {

  const updateFormValue = updateValue(setUser);
  const [fieldErrors, setFieldErrors] = useState();
  const open = !!user;

  useEffect(() => {
    if (open) {
      setFieldErrors(undefined);
    }
  }, [open]);

  const validateAndDone = async () => {
    if (user) {
      try {
        setFieldErrors(undefined);
        await validate(validator, user);
        onDoneEditing();
      } catch (errors) {
        setFieldErrors(errors);
      }
    }
  };

  return (
    <Dialog onClose={onCancelEditing} aria-labelledby="user-form-dialog-title" open={!!user} fullWidth maxWidth="sm">
      {
        user &&
        <>
          <DialogTitle id="user-form-dialog-title">{creating ? 'Add' : 'Modify'} User</DialogTitle>
          <DialogContent dividers>
            <ValidatedTextField
              fieldErrors={fieldErrors}
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              value={user.email}
              disabled={!creating}
              onChange={updateFormValue}
              margin="normal"
            />
            <ValidatedPasswordField
              fieldErrors={fieldErrors}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              value={user.password}
              onChange={updateFormValue}
              margin="normal"
            />
            <BlockFormControlLabel
              control={
                <Checkbox
                  name="admin"
                  checked={user.admin}
                  onChange={updateFormValue}
                />
              }
              label="Admin?"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={onCancelEditing} color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={validateAndDone}
              color="primary"
              autoFocus
            >
              Done
            </Button>
          </DialogActions>
        </>
      }
    </Dialog>
  );
};

export default UserForm;
