import React from 'react';

import { Button, TYPES } from '../../components/atoms/YellowButton';

export default ({
  onClose,
  markAsClose,
  selectedQuestionId,
  getQuestions,
  loading
}) => {
  return (
    <div className='drawer-up-doc'>
      <div className="right-side-dark-para">CLOSE THE MATTER</div>
      <div>
        <p>
          Please note this cannot be undone. If you close this matter,
          you will need to ask a new question to continue further with your query.
        </p>
      </div>
      <div>
        <p>
          Are you sure you want to close this matter?
        </p>
      </div>

      <div className='calltype-btn float-right'>
        <Button
          disabled={loading}
          text='Yes'
          type='button'
          buttonType={TYPES.Generic}
          onClick={() => {
            markAsClose({ id: selectedQuestionId})
              .then(() => {
                onClose();
                getQuestions();
              });
          }}
        />
        <Button
          disabled={loading}
          text='No'
          type='button'
          onClick={onClose}
          buttonType={TYPES.Generic}
        />
      </div>
    </div>
  );
}