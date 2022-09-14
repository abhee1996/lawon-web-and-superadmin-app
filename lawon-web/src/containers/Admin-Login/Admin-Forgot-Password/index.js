import React, {Component} from 'react'
import {Button, TYPES} from '../../../components/atoms/YellowButton'
import {Input} from '../../../components/atoms/InputField'
import { Link } from 'react-router-dom';

class AdminForgotPassword extends Component{
    state = { 
    }
    constructor(props){
       super(props);
       this.state = {      
           password:"",
           email:"",
           phonenumber:"",
           isNonTechnical:null,
          
           isShowPassword:'password',
           showLoader:false
       }
       
     }      

    handleChangeInput = event =>{
     let isChecked = event.target.checked;
      console.log('change is triggered',isChecked)  
     this.setState({ [event.target.name]:event.target.value, isNonTechnical:isChecked})   
   }
    
    render(){
        return(
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
                                name= {'email'}              
                                placeholder = {'Enter Email Address'}
                                handleChange={this.handleChangeInput}
                                id={'email'}
                                />
                            </div>

            

                            
                                <div class='register-btn-section text-center'>
                            <Link to = '/main/admincreatepassword' >
                                <Button 
                                    text='Send Password' 
                                    type='button' 
                                    
                                    buttonType={TYPES.Register}  
                                    />
                            </Link>
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
export default AdminForgotPassword