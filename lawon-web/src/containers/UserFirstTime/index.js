import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, TYPES} from '../../components/atoms/YellowButton'
import {Input} from '../../components/atoms/InputField'

class UserFirstTime extends Component {
    state = {  }
    render() { 
        return ( 

            <div class='container'>
            <div class='row'>
            <div class='col-md-1'></div>
             <div class='col-md-10 login-section'>
         

          
             <div class='form-box'>
                <div class='row'>
            
                 <div class='col-md-6 user-first-left-side'>
                 <h1 class=''>
           Welcome, John
             </h1>
                 <p class='form-para'>
                 Get used to feeling smug, because legal expertise is officially at your disposal.
                 </p>
                 
                 <div className='user-first-options'>
                 <div class="right-side-bold-yellow">Question</div>
                 <p>
                 Fast, free answers to your general legal questions from our solicitors.
                 <br/>
                 <br/>
                 We don't think you should wait days to connect with the right legal advisor when you need to get things sorted straight away.
                  We take away uncertainty and put you in touch with the right kind of help, fast.
                 </p>
                 <div className='user-first-btn'>              
                         <Link to='/main/userbookconsultation'>
                 <Button 
                      text='Ask the Lawyer' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.Register}  
                    />
                 </Link>
                 </div>
               
                 </div>

                       <div className='user-first-options'>
                 <div class="right-side-bold-yellow">Consultation</div>
                 <p>
                 Make an appointment in seconds, have a consultation in minutes.

                 <br/>
                 <br/>
                 We connect you with a trustworthy lawyer at a time that suits you. An appointment with a lawyer shouldn’t mean ‘you’ take time off to fit ‘their’ office hours.
                 </p>
                 <div className='user-first-btn'>
                 <Link to='/main/userbookconsultation'>
                 <Button 
                      text='Book a Consultation' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.Register}  
                    />
                 </Link>
               
                 </div>
               
                 </div>

                 </div>
                <div class='col-md-6'>
                <div class='background-form-section-userfirsttime'>                 
                </div>
                </div>
             </div>
             </div>
             </div>
              <div class='col-md-1'></div>
            </div>
            </div>
         );
    }
}
 
export default UserFirstTime;