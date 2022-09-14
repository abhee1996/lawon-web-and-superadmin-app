import React, { Component } from 'react'
import Dialog from "@material-ui/core/Dialog";

import { Button, TYPES } from "../../../components/atoms/YellowButton";
class FirmDetailBlock extends Component {
    state = {
        dailogOpen: false,
    }
    DailogClickOpen = () => {
        this.setState({ dailogOpen: true });
    };
    handleClose = value => {
        this.setState({ dailogOpen: false });
    };
    render() {
        return (
            <div>
                <div class="col-md-8">
                    <div class="heading">
                     Firm Details
                        </div>
                    <div class="col-md-12 firm-detail-background">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="https://picsum.photos/id/1/190/195" />
                            </div>
                            <div class="col-md-8">
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Name:
                                </div>
                                    <div class="col-md-7 text-grey">
                                        Johnson & boon
                                </div>
                                </div>
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Address:
                                </div>
                                    <div class="col-md-7 text-grey">
                                        55-A George Street Canberra Aus
                                </div>
                                </div>
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Phone number:
                                </div>
                                    <div class="col-md-7 text-FCA900">
                                        (606) 234 5678
                                </div>
                                </div>
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Email:
                                </div>
                                    <div class="col-md-7 text-grey">
                                        help@johnson&boon.co.uk
                                </div>
                                </div>
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Current Package:
                                </div>
                                    <div class="col-md-7 text-grey">
                                        Standard
                                </div>
                                </div>

                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Billing Date:
                                </div>
                                    <div class="col-md-7 text-grey">
                                        01 Jan 2019 - 01 Jan, 2020
                                </div>
                                </div>
                                <div class="col-md-12" style={{ paddingBottom: "10px" }}>
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        Store Status
                                </div>
                                    <div class="col-md-7 text-grey">
                                        <span style={{ background: "#2e9f45", borderRadius: "10px", color: "#fff", textAlign: "center", padding: "2px 15px", }}>
                                            Active
                                    </span>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                        280 Reviews
                                </div>
                                    <div class="col-md-7" style={{ color: "rgb(254, 180, 28)", fontSize: "13px" }}>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star" aria-hidden="true"></i></span>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star" aria-hidden="true"></i></span>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star" aria-hidden="true"></i></span>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star" aria-hidden="true"></i></span>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star-half-o" aria-hidden="true"></i></span>
                                        <span style={{ padding: "3px" }}><i class="fa fa-star-o" aria-hidden="true"></i></span>
                                        <p style={{ margin: "0px", cursor: "pointer" }} onClick={this.DailogClickOpen}>
                                            See More (245) </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog onClose={this.DailogClose} open={this.state.dailogOpen}>
                        <div>
                            <div class="col-md-12 plan-popup" style={{ padding: "0px", margin: "0px" }}>
                            <div class="col-md-12" style={{ background: "#feb41c", textAlign: "center", }}>
                                        <h2>All Reviews (245)</h2>
                                    </div>
                                <div class="col-md-5"> <br></br>  </div>
                                <div class='col-md-12'>
                                    <div class="row bg-white">
                                        <div class="col-md-12 padding-0">
                                            <div class="col-md-2 img">
                                                <img src="./images/firm-details/review_img.png" />
                                            </div>
                                            <div class="col-md-8 padding-0 accepted-review-detail">
                                                <div>Jason SMith - Aug 5, 2019</div>
                                                <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames </div>
                                            </div>
                                            <div class="col-md-2 ">
                                                <img class="star-img" src="./images/firm-details/stars.png" />
                                            </div>
                                        </div>
                                        <div style={{ paddingTop: "5px" }} class="col-md-12 hr-line"> <hr /> </div>
                                        <div class="col-md-12 padding-0">
                                            <div class="col-md-2 img">
                                                <img src="./images/firm-details/review_img.png" />
                                            </div>
                                            <div class="col-md-8 padding-0 accepted-review-detail">
                                                <div>Jason SMith - Aug 5, 2019</div>
                                                <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames </div>
                                            </div>
                                            <div class="col-md-2 ">
                                                <img class="star-img" src="./images/firm-details/stars.png" />
                                            </div>
                                        </div>
                                        <div style={{ paddingTop: "5px" }} class="col-md-12 hr-line"> <hr /> </div>
                                        <div class="col-md-12">
                                            <div class="col-md-5"></div>
                                            <div class="col-md-3">
                                                <Button
                                                    text="Load More"
                                                    type="button"
                                                    buttonType="btn register-btn"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  created-popup-action" style={{ paddingBottom: '20px' }}>
                                    <div class="col-md-6"></div>
                                    <div class="col-md-3 no-padding"></div>
                                    <div class="col-md-3 no-padding">
                                        <Button
                                            text="Close"
                                            type="button"
                                            buttonType="btn dialog-delete-btn"
                                            onClick={this.handleClose}
                                        />
                                    </div>

                                    <div class="col-md-4"></div>

                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div class="col-md-4 padding-0">
                    <div class="col-md-12">
                        <div class="current-pakage">
                            <div class="heading -marginleft15">Current Pakage </div>
                            <div class="row white-background">
                                <div class="col-md-12 padding-L-R">
                                    <div class="col-md-5" style={{ paddingTop: "50px", paddingBottom: "68px" }}>
                                        <div class="circle">
                                            <img class="current-pakage-img" src="./images/firm-details/current-pakage.png" alt="current-pakage" />
                                        </div>
                                        <div class="current-pakage-standard"> STANDARD</div>
                                    </div>
                                    <div class="col-md-7" style={{ padding: "0px" }}>
                                        <div class="free-trial-bg">
                                            <div><span class="pound"> £</span><span class="amount">95</span><span class="month">/ month</span></div>
                                            <div> <button class="free-trial-btn"> Upgrade Plan </button> </div>
                                        </div>
                                    </div>
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