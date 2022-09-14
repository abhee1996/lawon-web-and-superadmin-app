import React, { Component } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';


const InactivePopup = ({ onClose, makeLawyerActive, id, onDrawerClose }) => {
  return (
    <div>
      <div className='dialog-head'>Make lawyer Inactive</div>
      <div className='dialog-para'>
        <div>  This user will not be able to:</div>
        <div>- Login to LawOn Lawyer Portal</div>
        <div>- Receive notifications to calendar</div>
        <br />
        <div>This user will still be able to login to LawOn Client Portal</div>
      </div>
      <div className='dialog-btns'>
        <button onClick={onClose} className='btn btn-generic'>Cancel</button>
        <button onClick={() => {
          makeLawyerActive({ isActive: false, lawyerId: id })
            .then(() => onDrawerClose());
        }} className='btn btn-generic'>Yes</button>
      </div>
    </div>
  );
}

const DeletePopup = ({ onClose, id, deleteLawyer, onDrawerClose, getLawyers }) => {
  return (
    <div>
      <div className='dialog-head'>Delete Lawyer</div>
      <div className='dialog-para'>
        <div> By deleting user you cancel all his active consultations and enquiries. </div>
        <br />
        <div>Contact clients to inform them about the fact.</div>
      </div>
      <div className='dialog-btns'>
        <button onClick={onClose} className='btn btn-generic'>Cancel</button>
        <button
          onClick={() => {
            deleteLawyer({ id });
            onClose();
            onDrawerClose();
            getLawyers();
          }}
          className='btn btn-generic'>
          Delete User
        </button>
      </div>
    </div>
  );
}

export default class MakeActiveModal extends Component {
  render() {
    const { buttonId, onClose, isModalOpen, selectedLawyer } = this.props;
    const { id } = selectedLawyer || {};

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isModalOpen}>
        <DialogContent>
          <div className='manage-team-dialog'>
            {
              buttonId === 1
              && (
                  <InactivePopup
                    id={id}
                    {...this.props}
                  />
                )
            }
            {
              buttonId === 2
              && (
                  <DeletePopup
                    id={id}
                    {...this.props}
                  />
                )
            }
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}