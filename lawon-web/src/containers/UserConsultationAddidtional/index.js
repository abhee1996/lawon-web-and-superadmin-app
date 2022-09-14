import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, createMuiTheme, MuiThemeProvider, Button, IconButton, CircularProgress } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { round } from 'lodash';

import * as actions from '../../actions/user/userConsultation';

const CONSULTATION_CHANNEL = {
  CALL: 1,
  VEDIO_CALL: 2
};

const fn = Intl.NumberFormat();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 13
  }
});

class UserConsultationAdditional extends Component {
  state = {
    callType: 2,
    description: '',
    attachments: [],
    phone: '',
    email: ''
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleChangeFile = ({ target: { files } }) => {
    this.setState({
      consultFile: files[0],
      consultFileName: files[0].name
    });
  }

  handleNext = () => {
    const { user, setConsultationData } = this.props;
    const { phone, email, attachments, callType, description } = this.state;
    const { phoneNumber, email: currentEmail } = user || {};

    setConsultationData({
      attachments,
      phone: phoneNumber || phone,
      email: email || currentEmail,
      callType,
      description
    })

    const path = window
      .location
      .hash
      .replace('#', '')
      .replace('details', "summary");

    this.props.history.push(path);
  }

  handleChangeFile = ({ target: { files } }) => {
    if (files && files.length) {
      const { attachments } = this.state;
      
      for (let index = 0; index < files.length; index++) {
        if (!attachments.some((attachment) => attachment.name === files[index].name))
          attachments.push(files[index]);
      }
      this.setState({ attachments });
    }
  };

  handleRemoveFile = (name) => {
    let { attachments } = this.state;

    attachments = attachments.filter((file) => file.name !== name);
    this.setState({ attachments });
  };

  render() {
    const { callType, attachments } = this.state;
    const { user } = this.props;
    const { phoneNumber, email } = user || {};
    return (
      <MuiThemeProvider theme={theme}>
        <div className='user-main-content-consultation'>
          <div className='container'>
            <div className='add-details-box'>
              <h2>Additional Details</h2>
              <div className='row add-details-btm-sec'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='label-add-details'>
                      How should your lawyer contact you?
                    </div>
                    <div className='add-details-btns'>
                      <div className='add-details-phone'>
                        <Button
                          disableRipple
                          variant={callType === CONSULTATION_CHANNEL.CALL ? 'contained' : 'outlined'}
                          color={callType === CONSULTATION_CHANNEL.CALL ? 'primary' : 'default'}
                          onClick={() => this.setState({ callType: CONSULTATION_CHANNEL.CALL })}>
                          Phone Call
                        </Button>
                        <div className='small-gray-text'>Make sure we have your mobile</div>
                      </div>
                      <div className='add-details-video'>
                        <Button
                          disableRipple
                          variant={callType === CONSULTATION_CHANNEL.VEDIO_CALL ? 'contained' : 'outlined'}
                          color={callType === CONSULTATION_CHANNEL.VEDIO_CALL ? 'primary' : 'default'}
                          onClick={() => this.setState({ callType: CONSULTATION_CHANNEL.VEDIO_CALL })}>
                          Video Call
                        </Button>
                        <div className='small-gray-text'>through the app</div>
                      </div>
                    </div>
                  </div>
                  {
                    (callType === CONSULTATION_CHANNEL.VEDIO_CALL)
                    && (
                      <div className='col-md-6'>
                        <div className='video-call-info'>
                          <div className='gray-info-box'>
                            To speak with the lawyer on video call you need to have
                            LawOn mobile app installed (available for both android
                            and iOS). Or you can use the app in a browser.
                            You will find links to download the app on the next screen.</div>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className='details-forlawyer'>
                  <div className='label-add-details'>
                    Provide additional information which may be useful for your lawyer
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: '100%' }}
                      multiline={true}
                      rows={6}
                      variant='outlined'
                      name='description'
                      onChange={this.handleChangeInput}
                      placeholder="Describe your problem"
                    />
                  </div>
                  <div className='float-left upload-ask'>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id='btn-upload'
                      multiple
                      type="file"
                      onChange={this.handleChangeFile}
                    />
                    <label htmlFor='btn-upload'>
                      <Button
                        variant='outlined'
                        component="span"
                        color='primary'>
                        Upload a File
                      </Button>
                    </label>
                  </div>
                  <div className='qfile-name'>
                    {attachments.map(({ name, size }) => {
                      return (
                        <div
                          key={name}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '50%',
                            borderBottom: '1px solid #ebeff1'
                          }}>
                          <div className="right-side-bold-yellow" style={{ marginLeft: '10px' }}>{name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ width: '100px' }}>{fn.format(round(size / 1000).toFixed(0))}kb</div>
                            <IconButton
                              onClick={() => this.handleRemoveFile(name)}
                              style={{ marginTop: '0px', color: 'red' }}>
                              <HighlightOff />
                            </IconButton>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className='contact-lawyer-details'>
                  <div className='label-add-details'>
                    Contact details
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group col-md-12 no-padding'>
                        <label className="control-label col-md-2" for="mobile">Mobile</label>
                        <div className="col-md-10">
                          <TextField
                            size='small'
                            style={{ width: '100%' }}
                            defaultValue={phoneNumber}
                            variant='outlined'
                            name='phone'
                            onChange={this.handleChangeInput}
                            placeholder='Phone Number'
                          />
                        </div>
                      </div>
                      <div className='form-group  col-md-12 no-padding'>
                        <label className="control-label col-md-2" for="email">Email</label>
                        <div className="col-md-10 pt-10">
                          <span>{email}</span>
                          <span className='small-gray-text float-right'>EDIT</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='gray-info-box'>
                        The lawyer will need your phone number to be able to ring you
                      for the consultation. We will not share this with anyone else.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bottom-blacknav'>
            <div className='text-center'>
              <span>Category <i className='fa fa-chevron-right'></i></span>
              <span> Location  <i className='fa fa-chevron-right'></i> </span>
              <span> Date/Time <i className='fa fa-chevron-right'></i></span>
              <span> Lawyer <i className='fa fa-chevron-right'></i></span>
              <span className='active-yellow'> Details <i className='fa fa-chevron-right'></i></span>
              <span> Summary <i className='fa fa-chevron-right'></i></span>
              <span> Confirmation</span>
              <span onClick={this.handleNext} className='float-right active-yellow'>
                NEXT <i className='fa fa-chevron-right'></i> </span>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation, auth } = user || {};
  return {
    ...userConsultation,
    ...auth
  };
}

export default connect(mapStateToProps, actions)(UserConsultationAdditional);



