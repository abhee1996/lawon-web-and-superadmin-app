import React, {Component} from 'react'
import {Button, TYPES} from '../../components/atoms/YellowButton'
import {Input} from '../../components/atoms/InputField'
import { Link } from 'react-router-dom';

class AdminLogin extends Component{
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
                        Please Login
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 bg">
                        <div class="form-group ">
               <Input type={'text'}              
               name= {'email'}              
               placeholder = {'YOUR EMAIL'}
               handleChange={this.handleChangeInput}
               id={'email'}
               />
                   </div>

              <div class="form-group">
              <Input 
               type={this.state.isShowPassword}              
               name= {'password'}              
               placeholder = {'ENTER PASSWORD'}              
               id={'password'}
               handleChange={this.handleChangeInput}
               />
               <Link  to = '/main/adminforgotpassword'>
               <span  class='show-password'>Forgot your password?</span>
               </Link>
                
                </div>

              
                  <div class='register-btn-section text-center'>
               
                  <Link to = '/main/admin/profile'>
                  <Button 
                      text='Login to your account' 
                      type='button' 
                      
                      buttonType={TYPES.Register}  
                    />
                  </Link>
                    </div>
                    <div className='non-tech-check'>
                       <label class="custom-check-box-container ">
                         Keep me login
                         <input onChange={this.handleChangeInput} type="checkbox"/>
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
export default AdminLogin