import React, { Component } from 'react';
import {Button, TYPES} from '../../components/atoms/YellowButton'
import {Input} from '../../components/atoms/InputField'
import {commonFunctions} from '../../utils/utils.js'
import {userAPIs} from '../../apiConstants/userAPIs'
import queryString from 'query-string';

class MobileVerify extends Component {
    state = {  }
    constructor(props){
      super(props);
      this.state = {      
          email:"",             
      }
      
    } 

    componentDidMount(){
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log('Params', params);
    }

    handleChangeInput = event =>{  
      this.setState({ [event.target.name]:event.target.value})   
    }

    async submitForgotForm(email){
      const dataTobeSent = { 
       email:this.state.email,      
    }
    var responsevar = await userAPIs.userForgotPassword(dataTobeSent);
    console.log('responsevar', responsevar)
    if(responsevar.code == 200 || responsevar.code == 201){
      this.props.history.push("/main/userentercode");
    }
    console.log('Problem in Reset');
   }
 
    render() { 
        return ( 

            <div class='container'>
            <div class='row'>
            <div class='col-md-1'></div>
             <div class='col-md-10 login-section'>
             <h1 class='text-center'>
           Enter Your Mobile Number
             </h1>

          
             <div class='form-box forget-password-form'>
                <div class='row'>
               <div class='col-md-4'></div>
                 <div class='col-md-4'>
                 <p class='form-para'>
                Plese enter your Mobile Number
                 <br/>
                 below and we'll send you a 4 Digit code             
                 </p>

                 <div class='form-area'>
                 <form>

              <div class="form-group">
              <Input type={'text'}              
               name= {'email'}              
               placeholder = {'YOUR NUMBER'}
               handleChange={this.handleChangeInput}
               id={'email'}
               />
                   </div>


                  <div class='register-btn-section text-center'>
                  <Button 
                      text='Send' 
                      type='button' submitForgotForm
                      onClick={() => this.submitForgotForm(this.state.email)}
                      buttonType={TYPES.Register}  
                    />
                 
                  </div>



                 </form>
                 </div>
                 </div>
                <div class='col-md-2'></div>
             </div>
             </div>
             </div>
              <div class='col-md-1'></div>
            </div>
            </div>
         );
    }
}
 
export default MobileVerify;