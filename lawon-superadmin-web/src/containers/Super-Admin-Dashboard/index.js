import React, { Component } from 'react'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import MembersDetail from './Members-details'

class SuperAdminDashboard extends Component {
    render() {
        return (
            <div class='main'>

                <div class="superadmin-dashboard">
                    <div class="heading">
                         Filters!
                        <button class="documents-btn">
                            <img class="margin-right" src="./images/firm-details/print.png" />
                            Print

                        </button>
                        <button class="documents-btn">
                            <img class="margin-right" src="./images/firm-details/PDF.png" />
                            PDF

                        </button>
                      
                        <button class="add-new-firm">
                            <i class="fa fa-plus-circle"></i>
                            Add New Firm

                        </button>
                    </div>

                    <div class="col-md-12 padding-0">
                        <div class="row bg">
                            <div class="col-md-10">
                                <div class='col-md-12'>
                                    <div class="col-md-6">
                                        <Input
                                            type={'text'}
                                            name={'plan-title'}
                                            placeholder={'Firm ID'}
                                            handleChange={this.handleChangeInput}
                                            id={'plan-title'}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <Input
                                            type={'text'}
                                            name={'plan-title'}
                                            placeholder={'Firm Name'}
                                            handleChange={this.handleChangeInput}
                                            id={'plan-title'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <Button
                                    text="Apply Filters"
                                    type="button"
                                    buttonType="btn register-btn"
                                    />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 no-padding">
                        <MembersDetail />
                    </div>
                </div>


            </div>
        )
    }
}
export default SuperAdminDashboard