import React from 'react';
import moment from 'moment';
import { findKey } from 'lodash';

const CONSULTATION_CHANNEL = {
  CALL: 1,
  VEDIO: 2
};

const CalendarTile = ({ consultations = [] }) => {
  const consultation = consultations[0];
  const { startTime } = consultation || {};

  return (
    <div className='calendar-box-section'>
      <div className='date-day'>{moment(startTime).format('dddd, DD MMMM')}</div>
      {
        consultations.map(({ startTime, User, channel }) => {
          const { firstName } = User || {};
          let icon = 'fa fa-video-camera';
          if (channel === CONSULTATION_CHANNEL.CALL) {
            icon = 'fa fa-phone';
          }
          return (
            <div className='calendar-box'>
              <div className='cal-icon'><i className={icon}></i></div>
              <div className='cal-time'>
                <div className='bold' style={{ padding: '0 25px', float: 'left' }}>{moment(startTime).format('HH:mm')}</div>
                <div style={{ float: 'left', fontWeight: 'bold' }}>{firstName}
                  <br />
                  <span style={{ fontWeight: '100', color: '#a7a2a2', fontSize: '12px' }}>{findKey(CONSULTATION_CHANNEL, (value) => value === channel)} Consultation</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
export default CalendarTile;