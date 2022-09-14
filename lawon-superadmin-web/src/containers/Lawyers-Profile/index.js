import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Dialog from "@material-ui/core/Dialog";
import 'react-circular-progressbar/dist/styles.css';
import { adminAPIs } from "../../apiConstants/adminAPIs";
import { Button, TYPES } from "../../components/atoms/YellowButton";
var allPlanInfo;
class LawyersProfile extends Component {
    state = {
        dailogOpen: false,
        allPlanInfo: [],
        load: false,
    }

    async componentDidMount() {
        var responsevar = await adminAPIs.adminGetLawyersProfile(this.props.match.params.id);
        if (responsevar.code == 200 || responsevar.code == 201) {
            console.log();
            this.setState({ allPlanInfo: responsevar.data, load: true });
            this.props.onPlanInfoDispatch();
        }
    }

    DailogClickOpen = () => {
        this.setState({ dailogOpen: true });
    };
    handleClose = value => {
        this.setState({ dailogOpen: false });
    };
    render() {
        const { allPlanInfo } = this.state;
        console.log("allPlanInfo", allPlanInfo);
        if (allPlanInfo.id) { console.log("this is one") } else { console.log("this is two") }
        // console.log("allPlanInfo", allPlanInfo.totalEnquiries);
        const percentage = 66;

        return (

            <div class="main">
                <section class="firm-details-section">
                    <div class="col-md-12">
                        <div class="heading">Lawyers Details</div>
                        <div class="col-md-12 firm-detail-background">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="https://picsum.photos/id/1/190/195" />
                                </div>
                                <div class="col-md-8">
                                    <div class="col-md-12" style={{ paddingBottom: "10px", fontSize: "15px" }}>
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                            Name:
                                </div>
                                        <div class="col-md-7 text-grey">
                                            {allPlanInfo.firstName} {allPlanInfo.lastName}
                                        </div>
                                    </div>
                                    <div class="col-md-12" style={{ paddingBottom: "10px", fontSize: "15px" }}>
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                            Address:
                                </div>
                                        <div class="col-md-7 text-grey">

                                        </div>
                                    </div>
                                    <div class="col-md-12" style={{ paddingBottom: "10px", fontSize: "15px" }}>
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                            Phone number:
                                </div>
                                        <div class="col-md-7 text-FCA900">
                                            {allPlanInfo.phoneNumber}

                                        </div>
                                    </div>
                                    <div class="col-md-12" style={{ paddingBottom: "10px", fontSize: "15px" }}>
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                            Email:
                                </div>
                                        <div class="col-md-7 text-grey">
                                            {allPlanInfo.email}

                                        </div>
                                    </div>


                                    <div class="col-md-12" style={{ paddingBottom: "10px", fontSize: "15px" }}>
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left" }}>
                                            Lawyers Status
                                </div>
                                        <div class="col-md-7 text-grey">
                                            {
                                            allPlanInfo.id ?
                                                allPlanInfo.isActive ?
                                                    <span style={{ background: "#2e9f45", borderRadius: "10px", color: "#fff", textAlign: "center", padding: "2px 15px", }}>Active</span>
                                                    : <span style={{ background: "red", borderRadius: "10px", color: "#fff", textAlign: "center", padding: "2px 15px", }}>Deactive</span>

                                            : ""
                                            }

                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="col-md-5 text-black padding-0" style={{ textAlign: "left", fontSize: "15px" }}>
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

                    <div class="col-md-12 quick-view-section">
                        <div class="heading">Enquiries</div>
                        <div class="row quick-view-bg">
                            <div class="col-md-4">
                                <h3>Total Enquiries</h3>
                                <CircularProgressbar value={percentage} text={`${percentage}%`}
                                    styles={buildStyles({ pathColor: "red", textColor: "red", })} />
                            </div>
                            <div class="col-md-4">
                                <h3>Open Enquiries</h3>
                                <CircularProgressbar value={percentage} text={`${percentage}%`} /></div>
                            <div class="col-md-4">
                                <h3>Close Enquiries</h3>
                                <CircularProgressbar value={percentage} text={`${percentage}%`}
                                    styles={buildStyles({ pathColor: "#FEB41C", textColor: "#FEB41C", })} />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 no-padding quick-view-section" style={{ paddingBottom: "30px" }}>
                        <div class="heading" style={{ paddingLeft: "15px" }}> </div>
                        <div class="col-md-6">
                            <div class="col-md-12 firm-detail-background">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 style={{ lineHeight: "2" }}>Total Consultations</h3>
                                        <h4>345</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <div style={{ borderRadius: "50%", height: "75px", width: "75px", backgroundColor: "#EEEEEE", margin: "10px 0px 10px 7px", }}>
                                            <img style={{ margin: "13px 8px", width: "50px", height: "50px" }} src="../../images/firm-details/current-pakage.png" alt="current-pakage" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-12 firm-detail-background">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 style={{ lineHeight: "2" }}>Total Cases</h3>
                                        <h4>345</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <div style={{ borderRadius: "50%", height: "75px", width: "75px", backgroundColor: "#EEEEEE", margin: "10px 0px 10px 7px", }}>
                                            <img style={{ margin: "13px 8px", width: "50px", height: "50px" }} src="../../images/firm-details/current-pakage.png" alt="current-pakage" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div >


        );
    }
}

export default LawyersProfile;