import React, { Component } from 'react';
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Input } from '../../../components/atoms/InputField'
import { commonFunctions } from '../../../utils/utils.js'
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import queryString from 'query-string';
import { Loader } from '../../../components/atoms/Loader'
import {connect} from 'react-redux'


class AdminEnterCode extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.state = {
      OTP: "",
      userId: "",
      showLoader: false,
      invalid: true,

    }
  }

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({
      userId: params.userId,
    })
  }

  handleChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  async submitOTP() {
    this.props.onStart()
    const dataTobeSent = {
      otp: this.state.OTP,

    }
    console.log('dataTobeSent', dataTobeSent)
    var responsevar = await adminAPIs.adminEnterCode(dataTobeSent);
    if (responsevar.code == 400 || responsevar.code == 404) {
      this.props.onCompleted()
      this.setState({
        invalid: false,

      })
    }
    console.log('responsevar', responsevar)
    if (responsevar.code == 200 || responsevar.code == 201) {
      this.props.onComplete()

      console.log('success in verify')
      this.setState({
        invalid: false,
       
      })
      this.props.history.push('/main/admincreatepassword');
      this.props.onCompleted()
    }
    else {
      console.log('Problem in verify')
    }
  }
  render() {
    return (

      <div class='container'>
        {this.state.showLoader ? <Loader /> : null}
        <div class='row'>
          <div class='col-md-1'></div>
          <div class='col-md-10 login-section'>
            <h1 class='text-center'>
              Verify Code
             </h1>


            <div class='form-box forget-password-form'>
              <div class='row'>
                <div class='col-md-4'></div>
                <div class='col-md-4'>
                  <p class='form-para'>
                    Please enter code that has
                 <br />
                    been sent to your Email
                 </p>

                  <div class='form-area'>
                    <form>

                      <div class="form-group">
                        <Input type={'text'}
                          name={'OTP'}
                          placeholder={'ENTER CODE'}
                          handleChange={this.handleChangeInput}
                        />
                        {this.state.invalid ? null : <span class="danger-text">Invalid code</span>}
                      </div>


                      <div class='register-btn-section text-center'>
                        <Button
                          text='Submit'
                          type='button' submitForgotForm
                          onClick={() => this.submitOTP()}
                          buttonType={TYPES.Register}
                        />

                      </div>



                    </form>
                  </div>
                </div>
                <div class='col-md-2'></div>
              </div>
            </div>
          </div>
          <div class='col-md-1'></div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
      onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
      onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

  }
}

export default connect(null, mapDispatchToProps)(AdminEnterCode)
