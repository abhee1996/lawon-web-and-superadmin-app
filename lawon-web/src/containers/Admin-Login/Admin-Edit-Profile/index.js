import React , { Component } from 'react'
import {Button, TYPES} from '../../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';
import {Input} from '../../../components/atoms/InputField'

class AdminEditProfile extends Component {
    render() {
        return(
            <div>
                  <div class="adminprofile-section">
                      <div class="heading">
                        Your Profile
                      </div>
                      <div class="sub-heading">
                      View your profile, you can update anytime!
                      </div>
                      <div class="col-md-5"></div>
                      <div class="col-md-2 hr-line"></div>
                      <div class="col-md-8 col-md-offset-2">
                      <div class="row edit-bg">
                          <div class="col-md-12">
                          <div class="col-md-6">
                              <div class="col-md-6">
                              <div class="col-md-12 no-padding">
                                  <div class="no-padding">Title:</div>
                              </div>
                              <div class="col-md-12 no-padding">
                                 <Input type={'text'}              
                                    name= {'title'}              
                                    placeholder = {'Mr'}
                                    handleChange={this.handleChangeInput}
                                    id={'title'}
                                    />
                               </div>
                              </div>
                              <div class="col-md-12">
                                  <div class="editprofile-text">Full name: </div>
                              </div>
                              <div class="col-md-12">
                              <Input type={'text'}              
                                    name= {'fullname'}              
                                    placeholder = {'Jason Stathom'}
                                    handleChange={this.handleChangeInput}
                                    id={'fullname'}
                                    />
                              
                              </div>
                              <div class="col-md-12">
                                  <div class="editprofile-text">Email:</div>
                              </div>
                              <div class="col-md-12">
                              <Input type={'text'}              
                                    name= {'email'}              
                                    placeholder = {'jason@gmail.com'}
                                    handleChange={this.handleChangeInput}
                                    id={'email'}
                                    />
                              
                              </div>
                              <div class="col-md-12">
                                  <div class="editprofile-text">Phone:</div>
                              </div>
                              <div class="col-md-12">
                              <Input type={'text'}              
                                    name= {'phone'}              
                                    placeholder = {' +44 123 467 8901'}
                                    handleChange={this.handleChangeInput}
                                    id={'phone'}
                                    />
                             
                              </div>
                              <div class="col-md-12">
                                  <div class="editprofile-text">Address:</div>
                              </div>
                              <div class="col-md-12">
                              <Input type={'text'}              
                                    name= {'address'}              
                                    placeholder = {'12  Trinity Crescent, WHARRAM PERCY. YO17 1NU'}
                                    handleChange={this.handleChangeInput}
                                    id={'address'}
                                    />
                              

                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="col-md-7"></div>
                              <div class="col-md-5">
                                  <div class="profile_picture">
                                      <img src="./images/firm-details/profile_picture.png"/>
                                  </div>
                              </div>
                          </div>
                          </div>
                          <div class="col-md-4"></div>
                          <div class="col-md-4">
                            <Link to = '/main/admin/profile'>
                                <Button
                                    text="Update Profile"
                                    type="button"
                                    buttonType="btn register-btn"
                                />
                              </Link>
                          </div>
                      </div>
                      </div>
                      
                  </div>
            </div>
        )
    }
}
export default AdminEditProfile