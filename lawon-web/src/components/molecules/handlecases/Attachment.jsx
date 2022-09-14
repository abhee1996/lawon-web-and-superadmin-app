import React from 'react';
import moment from 'moment';

export default ({ instructionDetails }) => {
  const { InstructionAttachments = [] } = instructionDetails || {};

  return (
    <div className='col-sm-12 pl0'>
      {
        InstructionAttachments.map(({ name = 'abc.unknown', url, createdAt }, index) => (
          <div key={index} className='row attachment-area'>
            <div className='col-sm-3'>
              <div className='pdf-box'>
                {name && name.split('.')[1].toUpperCase()}
              </div>
            </div>

            <div className='col-sm-9'>
              <div className='attachment-name'>
                {name}
              </div>
              <div className='attachment-date'>
                added {moment(createdAt).format('DD MMM YYYY, HH:mm')}
              </div>
              <div className='attachment-options'>
                <span>  <img height='' src={require('../../../assets/img/download-icon.png')} /></span>
                <a href={url} target='_blank'><span className='download-text'>DOWNLOAD</span></a>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}