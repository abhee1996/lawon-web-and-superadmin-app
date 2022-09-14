import React, { useState, useEffect } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import { Button, TYPES } from "../../atoms/YellowButton";

export default ({ auth, saveLawyerPersonalSettings }) => {
  const { lawyer } = auth || {};
  const { aboutMe } = lawyer || {};

  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('')

  useEffect(() => {
    setBio(aboutMe)
  }, []);

  const handleSubmit = () => {
    saveLawyerPersonalSettings({ aboutMe: bio }).then(({ errorMessage }) => {
      if (errorMessage) {
        // TODO: handle error message
        return
      }

      setMessage({
        description: 'Personal Settings has been updated successfully.',
        type: 'success'
      })
    })
  }

  return (
    <div className="col-sm-12 pl0">
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message && message.description && message.type === 'success'}
          onClose={() => setMessage('')}
          autoHideDuration={4000}
          message={message && message.description}
        />
      <div className="right-side-subheading">ABOUT ME</div>
      <div className="">
        <div class="form-group">
          <TextField
            style={{ width: '100%' }}
            variant='outlined'
            multiline
            rows={5}
            placeholder='Type your description here'
            value={bio}
            onChange={({ target: { value }}) => setBio(value)}
          />
        </div>
        <div className="float-right">
          <Button
            disabled={!bio}
            text="Save Changes"
            type="button"
            buttonType={TYPES.Generic}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}