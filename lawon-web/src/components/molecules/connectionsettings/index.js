import React, { useEffect } from 'react';
import { Switch } from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../../actions/accountSettings';
import { CALENDAR_TYPE, AUTH_TYPE } from '../../../common/constants';

const ConnectionSettings = ({ calender, getCalenderStatus, auth, disconnectCalender }) => {
  const { google = false, outlook = false } = calender || {};
  const { lawyer } = auth || {};
  const { id } = lawyer || {};

  useEffect(() => {
    getCalenderStatus();
  }, [])

  const onConnectCalender = ({ title, url, lawyerId }) => {
    const googleAuthPopup = window.open(`${window.baseUrl}${url}?lawyerId=${lawyerId}&authType=${AUTH_TYPE.CONNECT_CALENDER}`, '_blank', 'width=446,height=630,left=200,top=100');
    googleAuthPopup.document.title = title;

    window.addEventListener('message', ({ data }) => {
      const { message, error } = data || {};
      googleAuthPopup.close();

      if (error) {
        
      }

      if (message) {
        getCalenderStatus();
      }
    },
    false);
  }

  const handleOnChangeGoogle = ({ target: { checked } }) => {
    if (checked) {
      onConnectCalender({
        title: 'Google',
        url: '/calendars/auth/google',
        lawyerId: id
      })
    }
    else {
      disconnectCalender({ type: CALENDAR_TYPE.GOOGLE })
        .then(() => getCalenderStatus())
    }
  }

  return (
    <div>
      <div className='right-side-heading'>
        Connections
      </div>
      <div className='col-sm-12 no-padding'>
        <div className='right-side-light-text'>
          Connect you work calendar with LawOn to synchronise events
        </div>
        <div className='col-sm-10'>
          <div>Connect your Outlook Calendar</div>
        </div>
        <div className='col-sm-2'>
          <Switch
            value={outlook}
            color='primary'
          />
        </div>
        <div className='col-sm-10'>
          <div>Connect your Google Calendar</div>
        </div>
        <div className='col-sm-2'>
          <Switch
            color='primary'
            checked={google}
            onChange={handleOnChangeGoogle}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(({ accountSettings, auth }) => ({ ...accountSettings, auth }), actions)(ConnectionSettings);