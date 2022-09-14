import React, {Component} from 'react'
import {Button, TYPES} from '../../../components/atoms/YellowButton'
import {Input} from '../../../components/atoms/InputField'
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import {adminAPIs} from '../../../apiConstants/adminAPIs';
import {Loader} from '../../../components/atoms/Loader'
class AdminCreatePassword extends Component{
    state={
        setOpen:false,
        Open:false, 
        email:localStorage.getItem("email"),
        confirmPassword:"",
        password:"",
        error:false,
        showLoader:false,
        invalid:true,
    }
    async handleClickOpen () {
        this.setState({
            showLoader:true,

           })
        console.log("handle clicked for create password",this.state.email)
        const dataToBeSent= {
            password:this.state.password,
            email:this.state.email
        };
        
        
       if(this.state.password===this.state.confirmPassword){
        var responsevar = await adminAPIs.adminCreatePassword(dataToBeSent);
        if (responsevar.code == 400 || responsevar.code == 404) {
            this.setState({
              invalid: false,
              showLoader: false,
            })
          }
        console.log('Response Var' , responsevar);
        if(responsevar.code == 200 || responsevar.code == 201){
            this.setState({
                setOpen:true,
                showLoader:false,

            })
            console.log("success")
            localStorage.removeItem("email");
        }
       }
       else{
           this.setState({
               error:true
           })
       }
        
        
        
      };
     handleClose = () => {
        this.setState({
            setOpen:false
        })
      };
      handleChangeInput = (event) =>{
        let isChecked = event.target.checked;
         console.log('change is triggered',isChecked)  
        this.setState({ 
          [event.target.name]:event.target.value,
          invalid:true,
          isNonTechnical:isChecked
        })   
        console.log("Select Firm")
      }
    render(){
        return(
            <div>
                <div class="admin-login-section">
                {this.state.showLoader?<Loader/>:null}
                    <div class="heading">
                    Create new password!
                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 bg">
                        <div class="form-group ">
               <Input type={'text'}              
               name= {'password'}              
               placeholder = {'New password'}
               handleChange={this.handleChangeInput}
               id={'password'}
               />
                   </div>

              <div class="form-group">
              <Input 
               type={this.state.isShowPassword}              
               name= {'confirmPassword'}              
               placeholder = {'Confirm new password'}              
               id={'confirmPassword'}
               handleChange={this.handleChangeInput}
               />
              
               {this.state.invalid?null:<span class="danger-text">Criteria Mismatch</span>}
                </div>
             {this.state.error?<div style={{color:"red"}}>fields should be same</div>:null}
              
                  <div class='register-btn-section text-center'>
               
                  <Button 
                      text='Create Password' 
                      type='button' 
                      
                      buttonType={TYPES.Register}  
                      onClick={()=>this.handleClickOpen()}
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