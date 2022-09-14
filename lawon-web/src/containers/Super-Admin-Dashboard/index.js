import React, {Component} from 'react'
import {Button, TYPES} from '../../components/atoms/YellowButton'
import {Input} from '../../components/atoms/InputField'
import MembersDetail from './Members-details'

class SuperAdminDashboard extends Component{
    render(){
        return(
            <div>
              
                <div class="superadmin-dashboard">
                    <div class="heading">
                        Search Filters!
                        <button class="documents-btn">
                        <img class="margin-right" src="./images/firm-details/print.png"/>
                            Print

                        </button>
                        <button class="documents-btn">
                        <img class="margin-right" src="./images/firm-details/PDF.png"/>
                            PDF

                        </button>
                        <button class="documents-btn">
                        <img class="margin-right" src="./images/firm-details/Excel.png"/>
                            Excel

                        </button>
                        <button class="add-new-firm">
                        <i class="fa fa-plus-circle"></i>
                            Add New Firm

                        </button>
                    </div>
                
                    <div class="col-md-12 padding-0">
                        <div class="row bg">
                            <div class="col-md-12">
                                <div class="input-width">
                                    <Input 
                                    type={'text'}              
                                    name= {'plan-title'}              
                                    placeholder = {'Firm ID'}
                                    handleChange={this.handleChangeInput}
                                    id={'plan-title'}
                                    />
                                </div>
                                <div class="input-width">
                                    <Input 
                                    type={'text'}              
                                    name= {'plan-title'}              
                                    placeholder = {'Firm Name'}
                                    handleChange={this.handleChangeInput}
                                    id={'plan-title'}
                                    />
                                </div>
                                <div class="input-width">
                                    <Input 
                                    type={'text'}              
                                    name= {'plan-title'}              
                                    placeholder = {'Joined Date'}
                                    handleChange={this.handleChangeInput}
                                    id={'plan-title'}
                                    />
                                </div>
                                <div class="input-width">
                                    <Input 
                                    type={'text'}              
                                    name= {'plan-title'}              
                                    placeholder = {'First Name'}
                                    handleChange={this.handleChangeInput}
                                    id={'plan-title'}
                                    />
                                </div>
                                <Button
                                    text="Apply Filters"
                                    type="button"
                                    buttonType="btn register-btn"

                                />
                            </div>
                        </div>
                    </div>
                
                    <div class="heading">
                        Quick View!
                    </div>
                    <div class="col-md-4 no-padding">
                        <img width="427px" src="./images/firm-details/project-workload.png"/>
                    </div>
                    <div class="col-md-4 padding-0-5">
                        <img width="427px" src="./images/firm-details/audienceload.png"/>
                    </div>
                    <div class="col-md-4 padding-0-8 ">
                        <img width="427px" src="./images/firm-details/live-visit.png"/>
                    </div>
                    <div class="col-md-12 no-padding">
                        <MembersDetail/>
                    </div>
                </div> 
            

            </div>
        )
    }
}
export default SuperAdminDashboard