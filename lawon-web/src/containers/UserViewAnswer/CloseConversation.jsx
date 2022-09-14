import React from 'react';
import { Button } from '@material-ui/core';

export default ({ onYes, onNo }) => {
  return (
    <div className="drawer-up-doc">
      <div className="right-side-dark-para">CLOSE THE CONVERSATION</div>
      <div className="calltype-btn">
        <Button
          color='primary'
          variant='contained'
          onClick={onYes}>
          Yes
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          variant='outlined'
          color='primary'
          onClick={onNo}>
          No
        </Button>
      </div>
    </div>
  );
}