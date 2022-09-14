import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

export default ({ onVerify, isVerifyModalOpen, onClose }) => {
  const [otp, setOtp] = useState('');

  return (
    <Dialog
      open={isVerifyModalOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Verify Phone Number</DialogTitle>
      <DialogContent>
        <TextField
          style={{ width: '400px' }}
          onChange={({ target: { value }}) => setOtp(value)}
          placeholder='Enter 4 digit verification code...'
          name="firstName"
          autoFocus
          size='small'
          InputProps={{ autoComplete: 'off' }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!otp}
          color="primary"
          onClick={() => onVerify(otp)}>
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
}
