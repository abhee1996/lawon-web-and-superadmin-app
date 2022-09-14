import React from 'react';
import moment from 'moment';
import { IconButton, Avatar } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

export default ({ instructionDetails }) => {
  const { EnquiryConversation } = instructionDetails || {};
  const { EnquiryReplies = [], quotationReplyId } = EnquiryConversation || {};
  return (
    <div className="col-sm-12 pl0">
      {EnquiryReplies.map(({ id, replyContent, Lawyer, User, createdAt, EnquriyAttachments }) => {
        const { firstName, lastName, imageUrl } = User || Lawyer || {};
        return (
          <div className="row enquiry-section" key={id}>
            <div className="col-sm-2">
              <div className="box-image">
                <Avatar src={imageUrl} />
              </div>
            </div>

            <div className="col-sm-10 pl0">
              <div className="enquiry-user-name-date">
                <span className="team-list-name-enquiry">{firstName} {lastName}</span>
                <span className="team-list-para-enquiry">
                  {moment(createdAt).format('DD MMM YYYY, HH:mm')}
                </span>
              </div>
              <div className="right-side-light-para">
                {replyContent}
              </div>

              {(EnquriyAttachments && EnquriyAttachments.length > 0)
                && (
                  <div className="right-side-light-para" style={{ marginTop: '10px' }}>
                    {EnquriyAttachments.map(({ name, url, id }) => {
                      return (
                        <div
                          key={id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <div>
                            <IconButton
                              onClick={() => window.open(url, '_blank')}
                              size='small'>
                              <GetApp />
                            </IconButton>
                          </div>
                          <div className="right-side-bold-yellow">{name}</div>
                        </div>
                      )
                    })}
                  </div>
                )}

              {quotationReplyId === id
                && (
                  <div className="provided-box float-right">
                    <span className="provided-yellow-box">£</span>
                    <span className="provided-black-box">
                      <span className="blackbox-bold">Quote Provided</span>
                      <span className="blackbox-light">DETAILS</span>
                    </span>
                  </div>
                )}
            </div>
          </div>
        )
      })}
    </div>
  );
}