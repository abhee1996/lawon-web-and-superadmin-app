import React , { Component } from 'react'
import {Button, TYPES} from '../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';

class AdminManagePlan extends Component{
    render(){
        return(
            <div class="main">
                <div class="manage-plan-section">
                   <div class="heading">
                       Manage Plan 
                   </div>
                   <div>
                   <Link to = '/main/dashboardmaster/admincreateplan'>  
                                          <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Create New Plan</button>
    
                   </Link> 
                   </div>
                   <div class="sub-heading">
                       Available Plans
                   </div>
                   
                   <div class="row bg">
                       <div class="col-md-12">
                       <div class="plan">
                           <div className=''>
                            <div className='package-box'>
                            <div className='package-box-img'>
                            <img src = {require('../../assets/img/pkg-icon.png')} />
                            </div>
                            <div className='package-box-head'>Small Business</div>
                            <div className='mini-hr-line'></div>
                            <div className='package-lines'>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            1 Lawyer
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            1 Area of Law (private)
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            25 mile radius
                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Access to New Enquiries via LawOn features
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Whatsapp style communication with
                    clients (end-to-end encryption)
                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            3 months free trial
                            </span>
                            </div>
                            </div>

                            <div className='pkg-btn-btm'>
                            <div className='pkg-price'>
                            <span className='pound'>£</span>
                            <span className='bold-price'>45</span>
                            <span> / month</span>
                            </div>
                            <Button 
                                text='Start Free Trial' 
                                type='button' 
                                buttonType='btn top-dashboard-btn'
                                
                                />
                            </div>
                            </div>
                            </div>
                           
                    </div>
                                    <div class="plan">
                                    <div className=''>
                            <div className='package-box'>
                            <div className='package-box-img'>
                            <img src = {require('../../assets/img/pkg-icon.png')} />
                            </div>
                            <div className='package-box-head'>STANDARD</div>
                            <div className='mini-hr-line'></div>
                            <div className='package-lines'>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            3 Lawyer
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            3 Area of Law (private)
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            50 mile radius
                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Access to New Enquiries via LawOn features
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Whatsapp style communication with
                    clients (end-to-end encryption)
                            </span>
                            </div>
                              
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Video Consultation with new clients

                            </span>
                            </div>
                              
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Use LawOn’s features with your

                            </span>
                            </div>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            existing clients 

                            </span>
                            </div>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            3 months free trial
                            </span>
                            </div>
                            </div>

                            <div className='pkg-btn-btm'>
                            <div className='pkg-price'>
                            <span className='pound'>£</span>
                            <span className='bold-price'>45</span>
                            <span> / month</span>
                            </div>
                            <Button 
                                text='Start Free Trial' 
                                type='button' 
                                buttonType='btn top-dashboard-btn'
                                
                                />
                            </div>
                            </div>
                            </div>
                                    </div>
                                    <div class="plan">
                                    <div className=''>
                            <div className='package-box'>
                            <div className='package-box-img'>
                            <img src = {require('../../assets/img/pkg-icon.png')} />
                            </div>
                            <div className='package-box-head'>ELITE</div>
                            <div className='mini-hr-line'></div>
                            <div className='package-lines'>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            10 Lawyer
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            6 Areas of Law (personal & business)

                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            200 mile radius

                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Access to New Enquiries via LawOn features
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Whatsapp style communication with
                    clients (end-to-end encryption)
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Video Consultation with new clients

                            </span>
                            </div>
                              
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Use LawOn’s features with your

                            </span>
                            </div>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            existing clients 

                            </span>
                            </div>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            3 months free trial
                            </span>
                            </div>
                            </div>

                            <div className='pkg-btn-btm'>
                            <div className='pkg-price'>
                            <span className='pound'>£</span>
                            <span className='bold-price'>45</span>
                            <span> / month</span>
                            </div>
                            <Button 
                                text='Start Free Trial' 
                                type='button' 
                                buttonType='btn top-dashboard-btn'
                                
                                />
                            </div>
                            </div>
                            </div>
                                    </div>
                                    <div class="plan">
                                    <div className=''>
                            <div className='package-box'>
                            <div className='package-box-img'>
                            <img src = {require('../../assets/img/pkg-icon.png')} />
                            </div>
                            <div className='package-box-head'>BESPOKE</div>
                            <div className='mini-hr-line'></div>
                            <div className='package-lines'>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Upto 20 Lawyers

                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Upto all Areas of Law (personal &
business)

                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Upto National radius
                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Access to New Enquiries via LawOn features
                            </span>
                            </div>

                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Whatsapp style communication with
                    clients (end-to-end encryption)
                            </span>
                            </div>

                            
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Video Consultation with new clients

                            </span>
                            </div>
                            <div className='package-line-row'>
                            <span>
                                <i className='fa fa-check'></i>
                            </span>
                            <span className='package-line-row-text'>
                            Use LawOn’s features with your
existing clients 


                            </span>
                            </div>
                            </div>

                            <div className='pkg-btn-btm'>
                            <div className='pkg-price'>
                            <span className='pound'>£</span>
                            <span className='bold-price'>45</span>
                            <span> / month</span>
                            </div>
                            <Button 
                                text='Start Free Trial' 
                                type='button' 
                                buttonType='btn top-dashboard-btn'
                                
                                />
                            </div>
                            </div>
                            </div>
                                    </div>
                                    <div class="plan">
                                    <div className=''>
                            <div className='package-box-create-plan'>
                                    <div class='row'>
                                    <Link to = '/main/dashboardmaster/admincreateplan'>  
                                        <div class="col-md-12"> <div class='circle'>
                                        <i class="fa fa-plus"></i>
                                        </div></div>
                                    </Link>
                                        <div className='package-box-head'>Create New Plan</div>
                                       
                                    </div>
                            </div>
                            </div>
                                    </div>
                        <div class="col-md-12">
                            <div class="plan">
                            <Link to = '/main/dashboardmaster/admineditplan'> 
                                <Button
                                text="Edit"
                                type="button"
                                buttonType="btn btn-generic-yellow-transp"
                                />
                            </Link>
                            </div>
                            <div class="plan">
                            <Link to = '/main/dashboardmaster/admineditplan'> 
                                <Button
                                text="Edit"
                                type="button"
                                buttonType="btn btn-generic-yellow-transp"
                                />
                            </Link>
                            </div>
                            <div class="plan">
                            <Link to = '/main/dashboardmaster/admineditplan'> 
                                <Button
                                text="Edit"
                                type="button"
                                buttonType="btn btn-generic-yellow-transp"
                                />
                            </Link>
                            </div>
                            <div class="plan">
                            <Link to = '/main/dashboardmaster/admineditplan'> 
                                <Button
                                text="Edit"
                                type="button"
                                buttonType="btn btn-generic-yellow-transp"
                                />
                            </Link>
                            </div>
                        </div>
                                </div>

                   </div>
                </div>
            </div>
        )
    }
}
export default AdminManagePlan