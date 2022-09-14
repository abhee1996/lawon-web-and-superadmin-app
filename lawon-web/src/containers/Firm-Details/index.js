import React , {Component} from 'react'
import FirmDetailBlock from './Firm-Details-Block';
import PakageBillingDetails from './Pakage-Billing-Details';
import CurrentPakage from './Current-Pakage';
import QuickView from './Quick-View';
import Appointment from './Appointment';
import MembersDetail from './Members-details';
import Reviews from './Reviews';

class FirmDetails extends Component {
    render(){
        return(
            <div>
              
                <div>firmdetails</div>
                <section class="firm-details-section">
                    <div class="row background ">
                        <div class="col-md-12  ">
                            <a href='#'>Lawon </a> 
                                <span class="angle-right"><i class="fa fa-angle-right"></i></span>
                                <a href='#'> Admin dashboard  </a> 
                                <span class="angle-right"><i class="fa fa-angle-right"></i></span>
                                <a href='#'> Johnson & Boon </a> 
                             
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="action-btn">
                            Actions <span class="caret"></span>
                            
                        </button>
                    </div>
                    <div class='row'>
                        <div class="col-md-12 padding-left-20">
                            <div class="col-md-5">
                                <FirmDetailBlock/>
                            </div>
                            <div class="col-md-7 padding-0">
                                <div class="col-md-6"><PakageBillingDetails /></div>
                                <div class="col-md-6"><CurrentPakage/></div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-md-12 padding-0">
                        <QuickView/>
                    </div>
                    <div class="col-md-12 padding-0">
                        <Appointment/>
                    </div>
                    <div class="col-md-12 padding-member ">
                        <MembersDetail/>
                    </div>
                    <div class="col-md-12 padding-0">
                        <Reviews/>
                    </div>
                </section>
                

            </div>
        )
    }
}
export default FirmDetails