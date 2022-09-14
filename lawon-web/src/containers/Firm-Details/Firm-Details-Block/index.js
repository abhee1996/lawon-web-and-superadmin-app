import React,{Component} from 'react'

class FirmDetailBlock extends Component {
    render(){
        return(
            <div>
                <div class="heading">Firm Details</div>
                <div class="col-md-12 " >
                    <div class="row">
                        <div class="col-md-4 firm-detail-logo-background">
                            
                            <img  height= '130px' width= '130px' src="./images/firm-details/Firm-Logo.png" />
                        </div>
                        <div class="col-md-8 firm-detail-background">
                            <div class="col-md-12 padding-bottom-10">
                                <div class="col-md-4 text-black padding-0">
                                    Name:
                                </div> 
                                <div class="col-md-8 text-grey">
                                   johnson & boon
                                </div>
                            </div>
                            <div class="col-md-12 padding-bottom-10">
                                <div class="col-md-4 text-black padding-0">
                                    Address:
                                </div> 
                                <div class="col-md-8 text-grey">
                                     55-A George Street Canberra Aus
                                </div>
                            </div>
                            <div class="col-md-12 padding-bottom-10">
                                <div class="col-md-4 text-black padding-0">
                                phone number: 
                                </div> 
                                <div class="col-md-8 text-FCA900">
                                (606) 234 5678 
                                </div>
                            </div>
                            <div class="col-md-12 padding-bottom-10">
                                <div class="col-md-4 text-black padding-0">
                                    email: 
                                </div> 
                                <div class="col-md-8 text-grey">
                                    help@johnson&boon.co.uk
                                </div>
                            </div>
                            <div class="col-md-12 padding-bottom-10">
                                <div class="col-md-4 text-black padding-0">
                                lisence number:
                                </div> 
                                <div class="col-md-8 text-grey">
                                UK-1230-LWR
                                </div>
                            </div>
                     
                           
                            
                          



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FirmDetailBlock