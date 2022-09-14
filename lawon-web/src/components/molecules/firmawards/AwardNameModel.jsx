import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from '@material-ui/core';

export default ({ onClose, isTitleModalOpen, saveFirmAwards, file, getFirmAwards, onSubmit }) => {
  const [title, setTitle] = useState('');

  const firmAwardsSubmit = () => {
    const fd = new FormData();
    fd.append('media', file);
    fd.append('name', title);

    saveFirmAwards(fd).then(({ errorMessage }) => {
      if (errorMessage) {
        return;
      }

      onClose();
      setTitle('');
      getFirmAwards();
      onSubmit();
    })
  }

  return (
    <Dialog
      open={isTitleModalOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Award's Tilte</DialogTitle>
      <DialogContent>
        <TextField
          value={title}
          onChange={({ target: { value }}) => setTitle(value)}
          style={{ width: '400px' }}
          placeholder="Enter Award's Tilte"
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
          onClick={firmAwardsSubmit}
          color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}