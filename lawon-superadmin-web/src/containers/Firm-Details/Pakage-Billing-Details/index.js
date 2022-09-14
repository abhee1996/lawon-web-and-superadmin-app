import React, { Component } from 'react'

class PakageBillingDetails extends Component {
    render() {
        return (
            <div>
                <div class="heading -marginleft15">Pakage / Billing Details </div>
                <div class="row white-background margin-r">
                    <div class="">
                        <div class="col-md-12 padding-bottom-10">
                            <div class="col-md-5 text-black">
                                Current Package:
                                </div>
                            <div class="col-md-7 text-grey padding-0">
                                Standard
                            </div>
                        </div>
                        <div class="col-md-12 padding-bottom-10">
                            <div class="col-md-5 text-black">
                                Billing Date:

                                </div>
                            <div class="col-md-7 text-grey padding-0">
                                01 Jan 2019 - 01 Jan, 2020
                            </div>
                        </div>
                        <div class="col-md-12 padding-bottom-10">
                            <div class="col-md-5 text-black">
                                Store Status:

                                </div>
                            <div class="col-md-7 padding-t-b-7 text-grey ">
                                <div class="active-store-status">
                                    Active

                                    </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default PakageBillingDetails