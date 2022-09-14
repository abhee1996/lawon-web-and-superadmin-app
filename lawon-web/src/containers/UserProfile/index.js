import React, { Component } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  Avatar,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../actions/user/userProfile';
import Profile from './Profile';
import UserPassword from './UserPassword';
import UserNotification from './UserNotification';
import UserReferToFriend from './UserReferToFriend';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  }
});

class UserProfile extends Component {
  state = {
    buttonId: 1
  }

  componentDidMount() {
    const { getProfile } = this.props;
    getProfile();
  }

  handleChangeFile = ({ target: { files } }) => {
    const { setImage } = this.props;
    if (files && files.length) {
      setImage({ image: files[0] });
    }
  }

  setButton = (id) => {
    this.setState({ buttonId: id });
  }

  closePopupProfileComplete = () => {
    this.setState({
      dialogOpen: false
    });
  };


  render() {
    const { buttonId } = this.state;
    const { user, loading } = this.props;
    const {
      imageUrl,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      postcode,
      street,
      address,
      town,
      country
    } = user || {};

    const showEditMessage = Object.values({
      imageUrl,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      postcode,
      street,
      address,
      town,
      country
    }).some((value) => !value);
    return (
      <ThemeProvider theme={theme}>
        <div className='static-content'>
          <section>
            <div className='container'>
              <div className='col-md-8 col-md-offset-2 upload-userimg-sec'>
                <div className='col-md-4'>
                  <div className='user-img-box'>
                    <input type="file" onChange={this.handleChangeFile} />
                    <Avatar
                      variant='square'
                      style={{ width: '150px', height: '170px' }}
                      src={imageUrl}
                    />
                    <div class="middle">
                      <div class="text">
                        <div className='upload-icon'>
                          <i className='fa fa-upload'></i>
                        </div>
                        <div> Upload Profile Photo</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <h1>{firstName} {lastName}</h1>
                  {
                    (buttonId === 1 && showEditMessage)
                    && (
                      <div className='error-bold'>
                        <span><i className="fa fa-exclamation-circle"></i></span>
                        Your profile is incomplete. Please edit it.
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </section>

          <section className='user-profile-form'>
            <div className='container'>
              <div className='col-md-8 col-md-offset-2'>
                <div className='col-md-12'>
                  <div className='filter-user-profile'>
                    <span className={buttonId === 1 && "active-filter"} onClick={() => this.setButton(1)}>PROFILE</span>
                    <span className={buttonId === 2 && "active-filter"} onClick={() => this.setButton(2)}>PASSWORD</span>
                    <span className={buttonId === 3 && "active-filter"} onClick={() => this.setButton(3)}>NOTIFICATION</span>
                    <span className={buttonId === 4 && "active-filter"} onClick={() => this.setButton(4)}>REFER TO FRIENDS</span>
                  </div>
                </div>
                <div className='col-md-12 user-profile-form-area'>
                  {buttonId === 1 && <Profile />}
                  {buttonId === 2 && <UserPassword />}
                  {buttonId === 3 && <UserNotification />}
                  {buttonId === 4 && <UserReferToFriend />}
                </div>
              </div>
            </div>
          </section>
          <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ user: { userProfile } }) {
  return {
    ...userProfile
  };
}

export default connect(mapStateToProps, actions)(UserProfile);