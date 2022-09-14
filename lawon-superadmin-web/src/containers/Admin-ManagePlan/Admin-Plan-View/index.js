import React, { Component } from 'react'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux'


class AdminManagePlanView extends Component {
    state = {
        name: null,
        monthlyFee: "",
        annualFee: "1000",
        noOfLawyers: "",
        noOfServices: "",
        mileRadius: "",
        trialPeriod: "",
        oneTimeSetupFee: "1",
        introducerFee: "1",
        existing: "",
        accessToNewEnquiries: false,
        videoConsultation: false,
        sort: null,
        lawonFeatures: false,
        updatePlanId:"",
}
constructor(props) {
    super(props)

    this.state = {
        name: null,
        monthlyFee: "",
        annualFee: "1000",
        noOfLawyers: "",
        noOfServices: "",
        mileRadius: "",
        trialPeriod: "",
        oneTimeSetupFee: "1",
        introducerFee: "1",
        existing: "",
        accessToNewEnquiries: false,
        videoConsultation: false,
        sort: null,
        lawonFeatures: false,

    }
}
editPlan = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/admineditplan/',
      search: 'selectedplan=' + e,
    })


  }
    componentDidMount() {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        console.log('params selectedplan', params.selectedplan)
        localStorage.setItem("updatePlanId", params.selectedplan)
        this.props.AllPlanInfo.filter(item => item.id == params.selectedplan).map((item =>
            this.setState({
                name: item.name,
                monthlyFee: item.monthlyFee,
                annualFee: item.annualFee,
                noOfLawyers: item.noOfLawyers,
                noOfServices: item.noOfServices,
                mileRadius: item.mileRadius,
                trialPeriod: item.trialPeriod,
                oneTimeSetupFee: item.oneTimeSetupFee,
                introducerFee: item.introducerFee,
                accessToNewEnquiries: item.accessToNewEnquiries,
                videoConsultation: item.videoConsultation,
                sort: item.sort,
                lawonFeatures: item.lawonFeatures,
                updatePlanId:params.selectedplan

            })

        ))
        console.log(this.state.sort)

    }
    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="heading">
                        Manage Plan View
                   </div>
                    <div>
                        <Link to='/main/dashboardmaster/admincreateplan'>
                            <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Create New Plan</button>

                        </Link>
                    </div>
                    <div class="sub-heading">

                    </div>

                    <div class="row bg">
                        <div class="col-md-12">
                            <div class="col-md-4"></div>
                            <div class="plan col-md-3">
                                <div className=''>
                                    <div className='package-box'>
                                        <div className='package-box-img'>
                                            <img src={require('../../../assets/img/pkg-icon.png')} />
                                        </div>
                                        <div className='package-box-head'>{this.state.name}</div>
                                        <div className='mini-hr-line'></div>
                                        <div className='package-lines'>
                                            <div className='package-line-row'>
                                                <span>
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span className='package-line-row-text'>
                                                    {this.state.noOfLawyers} Lawyer
                                                </span>
                                            </div>

                                            <div className='package-line-row'>
                                                <span>
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span className='package-line-row-text'>
                                                    {this.state.noOfServices} Area of Law (private)
                            </span>
                                            </div>

                                            <div className='package-line-row'>
                                                <span>
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span className='package-line-row-text'>
                                                    {this.state.mileRadius} mile radius
                            </span>
                                            </div>


                                            <div className='package-line-row'>
                                                <span>
                                                   {this.state.accessToNewEnquiries?<i className='fa fa-check'></i>:null} 
                                                </span>
                                                <span className='package-line-row-text'>
                                                    Access to New Enquiries via LawOn features
                            </span>
                                            </div>

                                            <div className='package-line-row'>
                                                <span>
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span className='package-line-row-text'>
                                                    Whatsapp style communication with
                                            clients (end-to-end encryption)
                            </span>
                                            </div>


                                            <div className='package-line-row'>
                                                <span>
                                                    <i className='fa fa-check'></i>
                                                </span>
                                                <span className='package-line-row-text'>
                                                    {this.state.trialPeriod} months free trial
                            </span>
                                            </div>
                                        </div>

                                        <div className='pkg-btn-btm'>
                                            <div className='pkg-price'>
                                                <span className='pound'>£</span>
                                                <span className='bold-price'>{this.state.monthlyFee}</span>
                                                <span> / month</span>
                                            </div>
                                            <Button
                                                text='Start Free Trial'
                                                type='button'
                                                buttonType='btn top-dashboard-btn'

                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-12">
                                <div class="col-md-5"></div>
                                <div class="plan">
                                 
                                        <Button
                                            text="Edit"
                                            type="button"
                                            buttonType="btn btn-generic-yellow-transp"
                                            onClick={()=>this.editPlan(this.state.updatePlanId)}
                                    />
                                   
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStoreToProps = state => {
    return {
        AllPlanInfo: state.AllPlanInfo
    };
}
export default connect(mapStoreToProps, null)(AdminManagePlanView)
