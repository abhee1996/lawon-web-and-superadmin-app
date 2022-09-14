import React, { Component } from 'react'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import { userAPIs } from '../../../apiConstants/userAPIs';
import { connect } from 'react-redux'

var adminInfo;

class AdminEditProfile extends Component {
  state = {
    adminEmail: "",
    adminName: "",
    adminPhoneNumber: "",
    adminImageURL: 'images/dummyupload.png',
    adminFile: "",
    adminCurrentPassword: "",
    adminNewPassword: ""

  }
  constructor(props) {
    super(props);
    this.state = {
      buttonId: 1,
      addActive: 1,
      dialogOpen: false,
      adminEmail: "",
      adminName: "",
      adminPhoneNumber: "",
      adminImageURL: 'images/dummyupload.png',
      adminFile: "",
      adminCurrentPassword: "",
      adminNewPassword: "",
      isShowPassword: 'password',


    }
    this.setButton = this.setButton.bind(this);
  }



  handleChangeInput = event => {
    console.log('On chanage value', event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }



  handleChangeFile = event => {
    this.setState({
      adminImageURL: URL.createObjectURL(event.target.files[0]),
      adminFile: event.target.files[0]
    })
    console.log("upload image update", this.state.adminImageURL)
  }


  setButton(id) {
    this.setState({
      buttonId: id,
      addActive: id
    });
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

  openPopupProfileComplete = () => {
    this.setState({ dialogOpen: true });
  };
  showAddressList = () => {
    this.setState({ showAddressList: true });
  };
  closeAddressList = () => {
    this.setState({ showAddressList: false });
  };
  closePopupProfileComplete = event => {
    this.setState({
      dialogOpen: false
    });
  };


  async componentDidMount() {
    adminInfo = await adminAPIs.getAdminProfile();


    // Object.keys(userInfo).forEach(k => (!userInfo[k] && userInfo[k] !== undefined) && delete userInfo[k]);

    console.log(' admin INFO aaaa', adminInfo);
    this.setState({
      adminEmail: adminInfo.data[0].email,
      adminPhoneNumber: adminInfo.data[0].phoneNumber,
      adminName: adminInfo.data[0].firstName

    });
    if (adminInfo.data[0].imageUrl) {
      this.setState({ adminImageURL: adminInfo.data[0].imageUrl })
    }
    else {
      this.setState({ adminImageURL: 'images/user-dummyprofile.png' })
    }

  }
  async updateProfile() {
    this.props.onStart()

    const dataObj = {
      email: this.state.adminEmail,
      phoneNumber: this.state.adminPhoneNumber,
      firstName: this.state.adminName,
      media: this.state.adminFile
    }
    const datafile = new FormData();
    const dataToBeSent = {};
    for (let item in dataObj) {
      if (dataObj[item] != '') {
        // dataToBeSent[item] = dataObj[item];
        datafile.append(item, dataObj[item]);
      }
    }
    console.log('Datafile obj', datafile);
    this.setState({
      showloader: true
    })
    var responsevar = await adminAPIs.updateAdminProfile(datafile);
    this.setState({
      showloader: false
    })
    console.log('Response Var', responsevar);
    console.log("response admin profile update", responsevar.data)
    if (responsevar.code == 200 || responsevar.code == 201) {
      this.props.onComplete()
      adminInfo = await adminAPIs.getAdminProfile();
      this.props.onAdminInfoDispatch();
      this.setState({
        dialogOpen: true,
      })
this.props.onCompleted()
      console.log("success update")
    }
  }
  async updatePassword() {
    this.props.onStart()
    const dataTobeSent = {
      oldPassword: this.state.adminCurrentPassword,
      newPassword: this.state.adminNewPassword,
    }
    this.setState({
      showloader: true
    })
    var responsevar = await adminAPIs.updateAdminPassword(dataTobeSent);
    console.log('responsevar', responsevar)
    this.setState({
      showloader: false
    })

    if (responsevar.code == 200 || responsevar.code == 201) {
      this.props.onComplete()
      this.setState({
        dialogOpen: true,
      })
     

    }
    this.props.onCompleted()
  }

  render() {
    return (
      <div class="main">
        <div class="adminprofile-section">
          <div className='container'>

            <div className='col-md-8 col-md-offset-2 upload-userimg-sec'>
              <div className='col-md-4'>
                <div className='user-img-box'>
                  <input type="file" onChange={this.handleChangeFile} />
                  <img className="image" src={this.state.adminImageURL} />
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
                <h1 className=""></h1>
                <div className='error-bold'>
                </div>


              </div>
            </div>
          </div>
          <section className='user-profile-form'>
            <div className='container'>
              <div className='col-md-8 col-md-offset-2'>
                <div className='col-md-12'>
                  <div className='filter-user-profile'>
                    <span className={this.state.addActive === 1 && "active-filter"} onClick={() => this.setButton(1)}>PROFILE</span>
                    <span className={this.state.addActive === 2 && "active-filter"} onClick={() => this.setButton(2)}>PASSWORD</span>
                  </div>
                </div>
                <div className='col-md-12 user-profile-form-area'>

                  {this.state.addActive === 1 ?
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='right-side-subheading'>Basic Info</div>
                        <div className='form-area'>
                          <form>
                            <div class="form-group">
                              <Input type={'text'}
                                name={'adminName'}
                                value={this.state.adminName}
                                placeholder={'Name'}
                                handleChange={this.handleChangeInput}
                                id={'adminName'}
                              />
                            </div>
                            <div class="form-group">
                              <Input type={'text'}
                                name={'adminEmail'}
                                value={this.state.adminEmail}
                                placeholder={'Email'}
                                handleChange={this.handleChangeInput}
                                id={'adminEmail'}
                              />
                            </div>
                            <div class="form-group">
                              <Input type={'text'}
                                name={'adminPhoneNumber'}
                                value={this.state.adminPhoneNumber}
                                placeholder={'Mobile Number'}
                                handleChange={this.handleChangeInput}
                                id={'adminPhoneNumber'}
                              />
                            </div>

                          </form>
                        </div>







                        <div className='user-profile-btn'>
                          <Button
                            text='Update'
                            type='button'
                            onClick={() => this.updateProfile()}
                            buttonType={TYPES.Generic}
                          />
                        </div>


                      </div>
                    </div>
                    : null}
                  {this.state.addActive === 2 ?
                    <div className='row'>
                      <div className='col-md-12 no-padding'>
                        <div className='col-md-8'>
                          <div className='right-side-subheading'>Password</div>
                          <div className='form-area user-prof-password'>
                            <form>
                              <div class="form-group pos-relative">
                                <Input type={this.state.isShowPassword}
                                  name={'adminCurrentPassword'}
                                  placeholder={'Current Password'}
                                  handleChange={this.handleChangeInput}
                                  id={'adminCurrentPassword'}
                                />

                              </div>
                              <div class="form-group pos-relative">
                                <Input type={this.state.isShowPassword}
                                  name={'adminNewPassword'}
                                  placeholder={'New Password '}
                                  handleChange={this.handleChangeInput}
                                  id={'adminNewPassword'}
                                />
                                <i onClick={() => this.showPassword()} class='fa fa-eye-slash'></i>
                                   </div>



                            </form>
                          </div>
                          <div class="col-md-10">
                            <div className='admin-update-password-btn'>
                              <Button
                                text='Update'
                                type='button'
                                onClick={() => this.updatePassword()}
                                buttonType={TYPES.Generic}
                              />
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                    : null}
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}


const mapStoreToProps = state => {
  return {
    AdminInfo: state.AdminInfo

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAdminInfoDispatch: () => dispatch({ type: 'ADMIN_INFO', AdminInfo: adminInfo.data }),
    onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
    onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
    onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(AdminEditProfile)

