import React, { Component } from 'react'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';

class AdminProfile extends Component {
    render() {
        return (
            <div class="main"    >
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
                        <div class="row bg">
                            <div class="col-md-6">
                                <div class="col-md-4">
                                    <div class="profile-text">Title:</div>
                                </div>
                                <div class="col-md-8">
                                    Mr
                              </div>
                                <div class="col-md-4">
                                    <div class="profile-text">Full name: </div>
                                </div>
                                <div class="col-md-8">
                                    Jason Stathom
                              </div>
                                <div class="col-md-4">
                                    <div class="profile-text">Email:</div>
                                </div>
                                <div class="col-md-8">
                                    jason@gmail.com
                              </div>
                                <div class="col-md-4">
                                    <div class="profile-text">Phone:</div>
                                </div>
                                <div class="col-md-8">
                                    +44 123 467 8901
                              </div>
                                <div class="col-md-4">
                                    <div class="profile-text">Address:</div>
                                </div>
                                <div class="col-md-8">
                                    12  Trinity Crescent, WHARRAM PERCY. YO17 1NU

                              </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-5"></div>
                                <div class="col-md-7">
                                    <div class="profile_picture">
                                        <img src="./images/firm-details/profile_picture.png" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4"></div>
                            <div class="col-md-4">
                                <Link to='/main/dashboardmaster/admineditprofile'>
                                    <Button
                                        text="Edit Profile"
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
export default AdminProfile