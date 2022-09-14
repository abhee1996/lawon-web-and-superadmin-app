import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import queryString from 'query-string';
import Alert from "@material-ui/lab/Alert";

import * as actions from '../../actions/user/auth';
import { Button, TYPES } from '../../components/atoms/YellowButton';

class UserSocialReg extends Component {
  state = {
    message: ''
  }

  socialLogin = ({ e, title, url }) => {
    e.preventDefault();
    const { exchangeAuthToken, history } = this.props;
    const googleAuthPopup = window.open(`${window.baseUrl}${url}`, '_blank', 'width=446,height=630,left=200,top=100');
    googleAuthPopup.document.title = title;

    window.addEventListener('message', ({ data }) => {
      const { token, error } = data || {};
      googleAuthPopup.close();

      if (error) {
        return this.setState({ message: error });
      }

      if (token) {
        exchangeAuthToken({ token }).then(({ user }) => {
          if (!user) return;
          
          const { initailCreated } = user;
          if (initailCreated) {
            history.push('/main/userentercode');
          } else {
            history.push('/main/userdashboardmain');
          }
        });
      }
    },
    false);
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location || {};
    const { token, error } = queryString.parse(search);

    const googleAuthPopup = window.opener;
    if (googleAuthPopup && (token || error)) {
      googleAuthPopup.postMessage({ token, error }, window.location.origin);
    }
  }

  render() {
    const { loading } = this.props;
    const { message } = this.state;
    return (
      <div class='container'>
        <div class='row'>
          <div class='col-md-1'></div>
          <div class='col-md-10 login-section'>
            <h1 class='text-center'>
              Deal with legal matters like pro
            </h1>

            <div class='form-box'>
              <div class='row'>

                <div class='col-md-6 login-left-side'>
                  <p class='text-center form-para'>
                    The law can look scary on the outside,
                    <br />
                    but we can give you the inside track.
                 </p>

                  <div class='form-area form-area-register'>
                    <div class='fb-btn text-center'>
                      <Button
                        text='Register with Facebook'
                        type='button'
                        onClick={(e) => this.socialLogin({
                          e,
                          title: 'Facebook',
                          url: '/social/auth/facebook'
                        })}
                        buttonType={TYPES.Facebook}
                      />
                    </div>

                    <div class='ggle-btn text-center'>
                      <Button
                        text='Register with Google'
                        type='button'
                        onClick={(e) => this.socialLogin({
                          e,
                          title: 'Google',
                          url: '/social/auth/google'
                        })}
                        buttonType={TYPES.Google}
                      />
                    </div>

                    <div
                      class='ggle-btn text-center'
                      style={{ marginTop: '10px' }}>
                      {
                        message
                        && (
                          <Alert style={{ fontSize: "16px" }} severity="error">
                            {message}
                          </Alert>
                        )
                      }
                    </div>

                    <div className='text-center or-sep'>
                      <span className='gray-sep'>______</span>
                      <span className='gray-or'>or</span>
                      <span className='gray-sep'>______</span>
                    </div>
                    <div class='text-center'>
                      <Link to='/main/userregemail'>
                        <Button
                          text='Register with Email'
                          type='submit'
                          onClick={() => { }}
                          buttonType={TYPES.Login}
                        />
                      </Link>
                    </div>


                    <div class='agree-terms'>
                      <p>
                        By registering with LawOn you accept our
                          <Link to='/NavbarHome/termsandconditions'>
                          <a> Terms & Conditions </a>
                        </Link>

                      </p>
                    </div>

                    <div class='agree-terms text-center already-reg'>
                      <p>
                        Already registered?
                          <Link to='/main/usersociallogin'>
                          <a> Log in </a>
                        </Link>
                      </p>
                    </div>

                  </div>
                </div>
                <div class='col-md-6'>
                  <div class='background-form-section-social-reg'/>
                </div>
              </div>
            </div>
          </div>
          <div class='col-md-1'></div>
        </div>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return {
    ...auth
  };
}

export default connect(mapStateToProps, actions)(UserSocialReg);