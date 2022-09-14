import React, { Component } from 'react'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Input } from '../../../components/atoms/InputField'
import { Link } from 'react-router-dom';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import {Loader} from '../../../components/atoms/Loader'
import {connect} from 'react-redux'

class AdminForgotPassword extends Component {
    state = {
    }
    constructor(props) {
        super(props);
        this.state = {

            email: "",
            showLoader:false,
            invalid:true,

        }

    }

    handleChangeInput = event => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({ [event.target.name]: event.target.value, isNonTechnical: isChecked })
    }
    async submitForgotForm(email) {
       this.props.onStart()
        const dataTobeSent = {
            email: this.state.email,
        }
        var responsevar = await adminAPIs.superAdminDashboardForgotPassword(dataTobeSent);
        console.log('responsevar', responsevar)
        if(responsevar.code==500){
            this.setState({
                invalid:false,
                showLoader:false,
            })
        }
        if (responsevar.code == 200 || responsevar.code == 201) {
            this.props.onComplete()
           
            localStorage.setItem("email", this.state.email)
            this.props.history.push("/main/adminentercode");
        
        this.props.onCompleted(

        )}
        else {
            console.log('Problem in Reset');
        }

    }


    render() {
        return (
            <div>
                <div class="admin-login-section">
           
                    <div class="heading">
                        Forgot Your Password?
                    </div>
                    <div class="row">

                        <div class="col-md-4"></div>
                        <div class="col-md-4 bg-adminforgot">
                            <div class="col-md-12 address-to-recover">
                                Please enter your registered address to recover password
                        </div>
                            <div class="col-md-12 padding-l-r-40">
                                <div class="form-group ">
                                    <Input type={'text'}
                                        name={'email'}
                                        placeholder={'Enter Email Address'}
                                        handleChange={this.handleChangeInput}
                                        id={'email'}
                                    />
                                    {this.state.invalid?null:<span class="danger-text">Invalid Email</span>}
                                </div>




                                <div class='register-btn-section text-center'>

                                    <Button
                                        text='Send Password'
                                        type='button'
                                        onClick={() => this.submitForgotForm(this.state.email)}
                                        buttonType={TYPES.Register}
                                    />

                                </div>
                            </div>


                        </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps= dispatch =>{
    return{
         onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
      onComplete: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0})

    }
  }
  
  export default connect(null,mapDispatchToProps)(AdminForgotPassword)
