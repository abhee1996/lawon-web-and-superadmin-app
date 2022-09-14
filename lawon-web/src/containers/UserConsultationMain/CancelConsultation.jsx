import React from "react";
import { Button } from '@material-ui/core'

export default ({ Close, onYes, consultationCancel, match, bookConsultation }) => {
  
  // PROPS DESTRUCTURING
  const { params } = match || {};
  const { id } = params || {};

  const { consultation } = bookConsultation || {};
  const { Lawyer } = consultation || {};
  const { firstName, lastName } = Lawyer || {};

  // CALLBACK
  const handleYes = () => {
    Close();
    consultationCancel({ id }).then(({ isCancelled }) => {
      if (isCancelled) onYes();
    })
  }
  return (
    <div className="drawer-up-doc">
      <div class="right-side-dark-para">CANCELLATION</div>
      <div class="">
        Are you sure you want to cancel your consultation with {firstName} {lastName}?
      </div>

      <div className="calltype-btn float-right">
        <Button
          color='primary'
          variant='outlined'
          style={{ marginRight: '10px' }}
          onClick={handleYes}>
          Yes
        </Button>
        <Button
          variant='outlined'
          onClick={Close}>
          No
        </Button>
      </div>
    </div>
  );
};
