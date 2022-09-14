import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import moment from 'moment';

export default ({ onClose, conversation, isAttachementModalOpen }) => {
  const { EnquriyAttachments = [] } = conversation || {};

  return (
    <Dialog
      open={isAttachementModalOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Attachments</DialogTitle>
      <DialogContent>
      <React.Fragment>
      {EnquriyAttachments.length > 0
        ? (
          <div className="col-sm-12 pl0">
            {EnquriyAttachments.map(({ name, createdAt }) => (
                <div className="row attachment-area">
                  <div className="col-sm-3">
                    <div className="pdf-box">PDF</div>
                  </div>
                  <div className="col-sm-9">
                    <div className="attachment-name">{name}</div>
                    <div className="attachment-date">
                      Added {moment(createdAt).format("LL")},{" "}
                      {moment(createdAt).format("HH:mm")}
                    </div>
                    <div className="attachment-options">
                      <span>
                        {" "}
                        <img
                          src={require("../../assets/img/download-icon.png")}
                        />
                      </span>
                      <span className="download-text">DOWNLOAD</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )
        : (
          <h3 className="text-center">No Attachment Found</h3>
        )}
    </React.Fragment>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
