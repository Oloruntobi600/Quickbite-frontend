// ForgotPassword.jsx
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { forgotPassword } from './State/Authentication/Action';

const ForgotPassword = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email)); // Trigger forgotPassword action
      handleClose(); // Close the modal after submission
      setEmail(''); // Clear the input after submission
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="forgot-password-dialog-title">
      <DialogTitle id="forgot-password-dialog-title">Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Enter your email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Send Reset Link
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
