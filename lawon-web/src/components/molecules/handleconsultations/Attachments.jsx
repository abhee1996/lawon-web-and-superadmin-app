import React from 'react';
import moment from 'moment';

export default ({ props }) => {
  const { ConsultationAttachments = [] } = props;
  return (
    <div className='col-sm-12 pl0'>
      {
        ConsultationAttachments.map(({ name, createdAt, size, url }) => (
          <div className='row attachment-area'>
            <div className='col-sm-3'>
              <div className='pdf-box'>PDF</div>
            </div>
            <div className='col-sm-9'>
              <div className='attachment-name'>
                {name} (350 kb)
              </div>
              <div className='attachment-date'>
                added {moment(createdAt).format('DD MMMM YYYY, HH:mm')}
              </div>
              <a href={url} target='_blank' style={{ cursor: 'pointer' }} className='attachment-options'>
                <span>  <img height='' src={require('../../../assets/img/download-icon.png')} /></span>
                <span className='download-text'>DOWNLOAD</span>
              </a>
            </div>
          </div>
        ))
      }
    </div>
  );
}