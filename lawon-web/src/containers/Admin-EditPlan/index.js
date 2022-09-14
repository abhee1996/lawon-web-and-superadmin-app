import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import {Input} from '../../components/atoms/InputField'
import {Button, TYPES} from '../../components/atoms/YellowButton'
import Dialog from '@material-ui/core/Dialog';



class AdminEditPlan extends Component{
    state={
        setOpen:false,
        Open:false,
    }
    handleClickOpen = () => {
        this.setState({
            setOpen:true
        })
      };
     handleClose = () => {
        this.setState({
            setOpen:false
        })
      };
    handleChangeInput = event =>{
        let isChecked = event.target.checked;
         console.log('change is triggered',isChecked)  
        this.setState({ [event.target.name]:event.target.value, isNonTechnical:isChecked})   
      }
    render(){
       
        
        return(
            <div class="main">
                    <div class='create-plan-section'>
                    <div class="dashboard-main-heading">
                        <Link to='/main/dashboardmaster/adminmanageplan'>
                            <span className='top-heading-arrow'>
                                <i className='fa fa-arrow-left'>
                                </i>
                            </span>
                        </Link>
                        Manage Plan
                    </div>           
                    <div class="sub-heading">
                        Edit Basic Plan
                    </div>
                    <div class='row bg'>
                        <div class="col-md-3">
                            
                            <div class="col-md-12 margin">
                            <span class="plan-heading">Title</span>
                            <Input 
                                type={'text'}              
                                name= {'plan-title'}              
                                placeholder = {'Sample Title'}
                                handleChange={this.handleChangeInput}
                                id={'plan-title'}
                            />
                            </div>
                            <div class="col-md-12 margin">
                            <span class="plan-heading">Price</span>
                            <Input 
                                type={'text'}              
                                name= {'plan-price'}              
                                placeholder = {'£0.00'}
                                handleChange={this.handleChangeInput}
                                id={'plan-price'}
                            />
                            </div>
                            <div class="col-md-12 margin">
                            <span class="package-heading">Package Icon</span>
                            <img class="package-ico" src="./images/firm-details/package-ico.png" alt="Package Icon"/>
                            </div>
                            
                        </div>
                        <div class="col-md-9 ">
                           <div class="package-heading">
                           Details & permissions
                           </div>
                           <div class="col-md-9 padding-0">
                               <div class="table">
                                   <table width="100%">
                                       <tr class="odd">
                                           <td class="table-title" width="50%" >
                                               Lawyer
                                           </td>
                                           <td width="30%">
                                           <Input 
                                                type={'text'}              
                                                name= {'plan-lawyer'}              
                                                placeholder = {'0'}
                                                handleChange={this.handleChangeInput}
                                                id={'plan-lawyer'}
                                            />
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                       <tr class="even">
                                           <td class="table-title" width="50%" >
                                           Area of Law (private)
                                           </td>
                                           <td width="30%">
                                           <Input 
                                                type={'text'}              
                                                name= {'plan-lawyer'}              
                                                placeholder = {'0'}
                                                handleChange={this.handleChangeInput}
                                                id={'plan-lawyer'}
                                            />
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                       <tr class="odd">
                                           <td class="table-title" width="50%" >
                                           Radius
                                           </td>
                                           <td width="30%">
                                           <Input 
                                                type={'text'}              
                                                name= {'plan-lawyer'}              
                                                placeholder = {'0'}
                                                handleChange={this.handleChangeInput}
                                                id={'plan-lawyer'}
                                            />
                                           </td>
                                           <td>
                                           <span class="free-trial">0.00</span>
                                           </td>
                                       </tr>
                                       <tr class="even">
                                           <td class="table-title" width="50%" >
                                           Access to New Enquiries
                                           </td>
                                           <td width="30%">
                                           <div className='non-tech-check'>
                                                <label class="custom-check-box-container">        
                                                <input onChange={this.handleChangeInput} type="checkbox"/>
                                                <span class="checkmark"></span>
                                                    </label>
                                           </div>
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                       <tr class="odd">
                                           <td class="table-title" width="50%" >
                                           Whatsapp style communication
                                           with clients (end-to-end encryption)
                                           </td>
                                           <td width="30%">
                                           <div className='non-tech-check'>
                                                <label class="custom-check-box-container">        
                                                <input onChange={this.handleChangeInput} type="checkbox"/>
                                                <span class="checkmark"></span>
                                                    </label>
                                           </div>
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                       <tr class="even">
                                           <td class="table-title" width="50%" >
                                           Free Trial
                                           </td>
                                           <td width="30%">
                                           <Input 
                                                type={'text'}              
                                                name= {'plan-lawyer'}              
                                                placeholder = {'0'}
                                                handleChange={this.handleChangeInput}
                                                id={'plan-lawyer'}
                                            /> 
                                           </td>
                                           <td>
                                           <span class="free-trial">Months</span>
                                           </td>
                                       </tr>
                                       <tr class="odd">
                                           <td class="table-title" width="50%" >
                                           Video Consultation with new clients
                                           </td>
                                           <td width="30%">
                                           <div className='non-tech-check'>
                                                <label class="custom-check-box-container">        
                                                <input onChange={this.handleChangeInput} type="checkbox"/>
                                                <span class="checkmark"></span>
                                                    </label>
                                           </div>
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                       <tr class="last">
                                           <td class="table-title" width="50%" >
                                           Use LawOn’s features with your
                                            existing clients 
                                           </td>
                                           <td width="30%">
                                           <div className='non-tech-check'>
                                                <label class="custom-check-box-container">        
                                                <input onChange={this.handleChangeInput} type="checkbox"/>
                                                <span class="checkmark"></span>
                                                    </label>
                                           </div>
                                           </td>
                                           <td>

                                           </td>
                                       </tr>
                                   </table>

                               </div>
                           </div>

                        </div>
                    
                    </div>

                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">
                        <Link to='/main/dashboardmaster/adminmanageplan'>
                            <Button 
                                text="Cancel"
                                type="button"
                                buttonType="btn btn-generic"
                                
                            />
                        </Link>
                        <Button 
                        text="Save Changes"
                        type="button"
                        buttonType="btn register-btn"
                        onClick={this.handleClickOpen}
                    />
                        </div>

                        <div>
      
      <Dialog onClose={this.handleClose}  open={this.state.setOpen}>
        
            <div>
                <div class="col-md-12 plan-popup">
                    <div class="col-md-5"></div>
                    <div class="col-md-2 logo-alert">
                        <img src="./images/firm-details/popup-plan.png "/>
                    </div>
                    <div class="col-md-5"></div>
                    <div class="col-md-12 popup-text">
                    Do you want to save Changes?
                        
                    </div>
                    <div class="col-md-12 popup-action">
                    <Button 
                                text="SAVE"
                                type="button"
                                buttonType="btn register-btn"
                                
                            />
                    <Button 
                                text="Cancel"
                                type="button"
                                buttonType="btn btn-generic"
                                onClick={this.handleClose}
                            />
                       
                    </div>
                    
                    </div>         
            </div>
        
      </Dialog>
    </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default AdminEditPlan