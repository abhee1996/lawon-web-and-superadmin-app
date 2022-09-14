import React, { Component } from 'react';
import {Button, TYPES} from '../../components/atoms/YellowButton'
import {Input} from '../../components/atoms/InputField'
import {commonFunctions} from '../../utils/utils.js'
import {userAPIs} from '../../apiConstants/userAPIs'
import {lawyerAPIs} from '../../apiConstants/lawyerAPIs'
import queryString from 'query-string';
import LoadingBar from 'react-top-loading-bar'
import simpleReactValidator from 'simple-react-validator';
import ErrorPopup from '../../components/molecules/ErrorPopup';
import {connect} from 'react-redux'

class VerifyMobileNumber extends Component {
    state = {  }
    constructor(props){
      super(props);
      this.validator = new simpleReactValidator();
      this.state = {      
          otp:"",
          organizationID:'' ,
          selectedPlanID:'',
          lawyerID:'',
          lawyerType:''          
      }
      
    } 
    componentDidMount(){
        let url = this.props.location.search;
        let params = queryString.parse(url);           
        this.setState({
            organizationID:this.props.lawyerRegistrationData.organizationID,
            selectedPlanID:this.props.lawyerRegistrationData.selectedPlan,
            lawyerID:this.props.lawyerRegistrationData.id,
            lawyerType:this.props.lawyerRegistrationData.lawyerType,
        })  
    }

    handleChangeInput = event =>{  
      this.setState({ [event.target.name]:event.target.value})   
    }

    async submitOTP(){
    if(this.validator.fieldValid('otp')){
        this.LoadingBar.continuousStart()
        const dataTobeSent = { 
            otp:this.state.otp,                
         }
         console.log('dataTobeSent', dataTobeSent)
         var responsevar = await lawyerAPIs.verifyOrganizationOTP(dataTobeSent, this.state.organizationID);
         this.LoadingBar.complete()
         console.log('responsevar', responsevar)
         if(responsevar.code == 200 || responsevar.code == 201){            
             this.props.history.push({
                 pathname: '/main/makepayment/',
                 });
           }
           else if(responsevar === undefined){
            this.refs.Errormodalref.openModal();
            this.LoadingBar.complete();
           }
           else{
            console.log('Problem in register')
            this.refs.Errormodalref.openModal();
         }
    }
    else{
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
    }

   }
 
    render() { 
        return ( 

            <div class='container'>
        <LoadingBar 
          onRef={ref => (this.LoadingBar = ref)}      
          height={3}
          color="#feb41c"         
        />
            <div class='row'>
            <div class='col-md-1'></div>
             <div class='col-md-10 login-section'>
             <h1 class='text-center'>
          Verify Code
             </h1>

          
             <div class='form-box forget-password-form'>
                <div class='row'>
               <div class='col-md-4'></div>
                 <div class='col-md-4'>
                 <p class='form-para'>
                Please enter code that has
                 <br/>
                 been sent to your mobile
                 </p>

                 <div class='form-area'>
                 <form>

              <div class="form-group">
              <Input type={'text'}              
               name= {'otp'}              
               placeholder = {'ENTER CODE'}
               handleChange={this.handleChangeInput}               
               />
              {this.validator.message('otp', this.state.otp, 'required|numeric')}
                   </div>


                  <div class='register-btn-section text-center'>
                  <Button 
                      text='Save' 
                      type='button' submitForgotForm
                      onClick={() => this.submitOTP()}
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
            <ErrorPopup container={this} ref = "Errormodalref">
            </ErrorPopup> 
            </div>
         );
    }
}


const mapStoreToProps = ({common}) => {
    return {
        lawyerRegistrationData: common.lawyerRegistrationData,
    };
  };
export default connect(mapStoreToProps,null)(VerifyMobileNumber);