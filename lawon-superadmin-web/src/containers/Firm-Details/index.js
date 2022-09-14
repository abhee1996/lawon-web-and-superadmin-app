import React, { Component } from 'react'
import FirmDetailBlock from './Firm-Details-Block';
import PakageBillingDetails from './Pakage-Billing-Details';

import QuickView from './Quick-View';
import Appointment from './Appointment';
import MembersDetail from './Members-details';
import Reviews from './Reviews';


class FirmDetails extends Component {
    render() {
        return (
            <div class="main">
                <section class="firm-details-section">
                <div class="col-md-12 padding-0">
                        <FirmDetailBlock />
                    </div>

                    <div class="col-md-12 padding-0">
                        <QuickView />
                    </div>
                    <div class="col-md-12 padding-0">
                        
                        <Appointment />
                    </div>
                    
                    <div class="col-md-12 padding-0" style={{paddingTop:"20px"}}>
                        <MembersDetail />
                    </div>
                </section>


            </div>
        )
    }
}
export default FirmDetails