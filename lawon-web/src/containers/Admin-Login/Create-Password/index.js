import React, {Component} from 'react'
import {Button, TYPES} from '../../../components/atoms/YellowButton'
import {Input} from '../../../components/atoms/InputField'
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
class AdminCreatePassword extends Component{
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
    
    render(){
        return(
            <div>
                <div class="admin-login-section">
                    <div class="heading">
                    Create new password!
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 bg">
                        <div class="form-group ">
               <Input type={'text'}              
               name= {'email'}              
               placeholder = {'New password'}
               handleChange={this.handleChangeInput}
               id={'email'}
               />
                   </div>

              <div class="form-group">
              <Input 
               type={this.state.isShowPassword}              
               name= {'password'}              
               placeholder = {'Confirm new password'}              
               id={'password'}
               handleChange={this.handleChangeInput}
               />
              
                
                </div>

              
                  <div class='register-btn-section text-center'>
               
                  <Button 
                      text='Create Password' 
                      type='button' 
                      
                      buttonType={TYPES.Register}  
                      onClick={this.handleClickOpen}
                    />
                    </div>

                    
                        </div>
                    <div>
                    <Dialog onClose={this.handleClose}  open={this.state.setOpen}>
        
        <div>
            <div class="col-md-12 plan-popup">
                <div class="col-md-5"></div>
                <div class="col-md-2 logo-alert">
                    <img src="./images/firm-details/created.png "/>
                </div>
                <div class="col-md-5"></div>
                <div class="col-md-12 created-popup-text">
                 CONGRATULATION!
                <div class="popup-subtext">
                 Your new password created successfuly.
                </div>
                    
                </div>
                <div class="col-md-12  created-popup-action">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 no-padding ">
                    <Link to = '/main/adminlogin'>
                        <Button 
                            text="Login to your account"
                            type="button"
                            buttonType="btn register-btn"
                            
                        />
                    </Link>
            
                    </div>
                    <div class="col-md-4"></div>
                    
                   
                </div>
                
                </div>         
        </div>
    
  </Dialog>
                    </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminCreatePassword