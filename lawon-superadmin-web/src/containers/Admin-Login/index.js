import React, { Component } from 'react'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import { Link } from 'react-router-dom';
import NavBarLogin from '../../components/molecules/navbar-login'
import { adminAPIs } from '../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
import { Loader } from '../../components/atoms/Loader'
import { connect } from 'react-redux'
import LoadingBar from 'react-top-loading-bar';
var adminInfo;
class AdminLogin extends Component {
    state = {
        password: "",
        email: "",
        userType: 4,
        invalid: true,
        showLoader: false,
        isShowPassword: "password",

    }
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            password: "",
            email: "",
            userType: 4,
            invalid: true,
            showLoader: false,
            isShowPassword: "password"
        }

    }

    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("Select Firm", this.state.invalid)
    }
    showPassword() {
        if (this.state.isShowPassword == 'password')
            this.setState({
                isShowPassword: 'text'
            })
        else {
            this.setState({
                isShowPassword: 'password'
            })
        }
    }

    async superAdminLogin(email, password) {
        if (
            this.validator.fieldValid('email'),
            this.validator.fieldValid('password')

        ) {
            this.props.onStart()

            const dataToBeSent = {
                email: this.state.email,
                password: this.state.password,
                userType: this.state.userType,

            }
            var responsevar = await adminAPIs.superAdminDashboardLogin(dataToBeSent);
            console.log('submitted...')
            console.log('responsevar', responsevar);
            console.log('before 404', this.state.invalid)



            if (responsevar.code == 404 || responsevar.code == 400) {
                this.setState({
                    invalid: false,

                })
                console.log('in 404', this.state.invalid)
            }
            else {
                localStorage.setItem("AdminId", responsevar.data.id);
            }

            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.setState({
                    invalid: true,

                })

                adminInfo = await adminAPIs.getAdminProfile();
                this.props.onAdminInfoDispatch();
                this.props.onLogin();

                this.props.history.push({
                    pathname: '/main/dashboardmaster/superadmindashboard',

                });

                localStorage.setItem("AdminInfo", JSON.stringify(responsevar.data));
                localStorage.setItem("AdminAccessToken", responsevar.accessToken)
                console.log('in 200', this.state.invalid)

                this.props.onCompleted()
            }
            else {

                console.log('Problem in register')

            }
        }
        else {
            console.log('not submitted...')
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

        }

    }

    render() {
        return (
            <div>
                <NavBarLogin />
                <LoadingBar
                    progress={this.props.LoadingProgressBar}
                    height={3}
                    color='#feb41c'
                    onRef={ref => (this.LoadingBar = ref)}
                />

                <div class="admin-login-section">

                    <div class="heading">
                        Please Login
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 bg">
                            <div class="form-group ">
                                <Input type={'text'}
                                    name={'email'}
                                    placeholder={'YOUR EMAIL'}
                                    handleChange={this.handleChangeInput}
                                    id={'email'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('email', this.state.email, 'required|email')}
                                </span>
                            </div>

                            <div class="form-group">
                                <Input
                                    type={this.state.isShowPassword}
                                    name={'password'}
                                    placeholder={'ENTER PASSWORD'}
                                    id={'password'}
                                    handleChange={this.handleChangeInput}
                                />
                                <i onClick={() => this.showPassword()} class='fa fa-eye-slash'></i>

                                <span class="danger-text">
                                    {this.validator.message('password', this.state.password, 'required')}
                                </span>
                                {this.state.invalid ? null : <span class="danger-text">Invalid Email/Password</span>}
                            </div>
                            <div class="form-group">

                                <Link to='/main/adminforgotpassword'>

                                    <span class='forgot-password'>Forgot your password?</span>
                                </Link>

                            </div>


                            <div class='register-btn-section text-center'>
                            <Link to='/main/dashboardmaster/superadmindashboard'>

<span class='forgot-password'>superAdminLogin</span>
</Link>


                                {/* <Button
                                    text='Login to your account'
                                    type='button'
                                    onClick={() => {
                                        
                                        this.superAdminLogin()}}
                                    buttonType={TYPES.Register}
                                /> */}

                            </div>
                            <div className='non-tech-check'>
                                <label class="custom-check-box-container ">
                                    Keep me login
                         <input onChange={this.handleChangeInput} type="checkbox" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStoreToProps = state => {
    return {
      LoadingProgressBar: state.LoadingProgressBar
  
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        onAdminInfoDispatch: () => dispatch({ type: 'ADMIN_INFO', AdminInfo: adminInfo.data }),
        onLogin: () => dispatch({ type: 'IS_LOGIN' }),
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AdminLogin)