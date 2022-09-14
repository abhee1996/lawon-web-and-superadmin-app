import React , {Component} from 'react'

class CurrentPakage extends Component{
    render(){
        return(
            <div class="current-pakage">
                <div class="heading -marginleft15">Current Pakage </div>
                    <div class="row white-background margin-r">
                        <div class="col-md-12 padding-L-R">
                            <div class="col-md-4">
                                 <div class="circle">
                                     <img class="current-pakage-img"  src="./images/firm-details/current-pakage.png"  alt="current-pakage"/>
                                 </div>
                                 <div class="current-pakage-standard"> STANDARD</div>
                            </div>
                            <div class="col-md-7 col-md-offset-1 padding-R15 padding-0">
                                <div class="free-trial-bg">
                                    <div><span class="pound"> £</span><span class="amount">95</span><span class="month">/ month</span></div>
                                    <div> <button class="free-trial-btn"> Start Free Trial </button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default CurrentPakage