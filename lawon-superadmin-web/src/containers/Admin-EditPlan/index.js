import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../components/atoms/InputField'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import Dialog from '@material-ui/core/Dialog';
import { adminAPIs } from '../../apiConstants/adminAPIs';
import queryString from 'query-string';
import { connect } from 'react-redux'



class AdminEditPlan extends Component {
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
    editPlan = () => {
        this.props.history.push({
          pathname: '/main/dashboardmaster/admineditplan/',
          search: 'selectedplan=' + localStorage.getItem("updatePlanId"),
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

            })

        ))
        console.log(this.state.sort)

    }

    async updatePlan() {
        this.props.onStart()
        const dataToBeSent = {
            name: this.state.name,
            monthlyFee: this.state.monthlyFee,
            annualFee: this.state.annualFee,
            noOfLawyers: this.state.noOfLawyers,
            noOfServices: this.state.noOfServices,
            mileRadius: this.state.mileRadius,
            trialPeriod: this.state.trialPeriod,
            oneTimeSetupFee: this.state.oneTimeSetupFee,
            introducerFee: this.state.introducerFee,
            accessToNewEnquiries: this.state.accessToNewEnquiries,
            videoConsultation: this.state.videoConsultation,
            sort: this.state.sort,
            lawonFeatures: this.state.lawonFeatures
        }
        var responsevar = await adminAPIs.adminUpdatePlan(dataToBeSent);
        console.log('responsevar', responsevar);

        if (responsevar.code == 200 || responsevar.code == 201) {
            this.props.onComplete()
            this.props.history.push({
                pathname: '/main/dashboardmaster/manageplan/',

            });
            this.props.onCompleted()
            localStorage.removeItem("updatePlanId")
        }
        else {
            console.log('Problem in register')

        }

    }
    handlecheckPackage = (event) => {
        if (event.target.checked == true) {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check true")
        }
        else {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check false")
        }
    }
    handleChangeCheckbox = (event) => {
        let ischecked = event.target.checked
        console.log("change in checkbox", ischecked)
        console.log("this is my access enquiryyyyyy", this.state.accessToNewEnquiries)
        this.setState({
            [event.target.name]: event.target.checked
        })
        console.log("this is my access enquiry", this.state.accessToNewEnquiries)
    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
    }
    render() {


        return (
            <div class="main">
                <div class='create-plan-section'>
                    <div class="dashboard-main-heading">
                        Create New Plan
                    </div>
                    <div class="sub-heading">

                    </div>
                    <div class='row bg'>
                        <div class="col-md-3">

                            <div class="col-md-12 margin">

                                <Input
                                    type={'text'}
                                    name={'name'}
                                    value={this.state.name}
                                    handleChange={this.handleChangeInput}
                                    id={'name'}
                                />
                            </div>
                            <div class="col-md-12 margin">

                                <Input
                                    type={'text'}
                                    name={'monthlyFee'}
                                    value={"£"+Math.round(this.state.monthlyFee)}
                                    handleChange={this.handleChangeInput}
                                    id={'monthlyFee'}
                                />
                            </div>
                            <div class="col-md-12   no-padding">
                            <div class="no-padding">
                               <div class="form-group">
                                    <input
                                        type='number'
                                        name='sort'
                                        value={this.state.sort}
                                        id='screenPosition'
                                        min="1"
                                        max="10"
                                        class="form-control"
                                        onChange={this.handleChangeInput}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        <div class="col-md-9 ">
                            <div class="package-heading">
                                Details & permissions
                           </div>
                            <div class="col-md-9 padding-0">
                                <div class="table">
                                    <table width="100%">
                                        <tr class="odd">
                                            <td class="table-title" width="50%" >
                                                Lawyer
                                           </td>
                                            <td width="30%">
                                                <Input
                                                    type={'text'}
                                                    name={'noOfLawyers'}
                                                    value={this.state.noOfLawyers}
                                                    handleChange={this.handleChangeInput}
                                                    id={'noOfLawyers'}
                                                />
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr class="even">
                                            <td class="table-title" width="50%" >
                                                Area of Law (private)
                                           </td>
                                            <td width="30%">
                                                <Input
                                                    type={'text'}
                                                    name={'noOfServices'}
                                                    value={this.state.noOfServices}
                                                    handleChange={this.handleChangeInput}
                                                    id={'noOfServices'}
                                                />
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr class="odd">
                                            <td class="table-title" width="50%" >
                                                Radius
                                           </td>
                                            <td width="30%">
                                                <Input
                                                    type={'text'}
                                                    name={'mileRadius'}
                                                    value={Math.round(this.state.mileRadius)}
                                                    handleChange={this.handleChangeInput}
                                                    id={'mileRadius'}
                                                />
                                            </td>
                                            <td>
                                                <span class="free-trial">Miles</span>
                                            </td>
                                        </tr>
                                        <tr class="even">
                                            <td class="table-title" width="50%" >
                                                Access to New Enquiries
                                           </td>
                                            <td width="30%">
                                                <div className='non-tech-check'>
                                                    <label class="custom-check-box-container">
                                                    {this.state.accessToNewEnquiries?<input onChange={this.handleChangeCheckbox} checked type="checkbox" name="accessToNewEnquiries"/>:<input onChange={this.handleChangeCheckbox} type="checkbox" name="accessToNewEnquiries"/>}
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr class="odd">
                                            <td class="table-title" width="50%" >
                                                Whatsapp style communication
                                                with clients (end-to-end encryption)
                                           </td>
                                            <td width="30%">
                                                <div className='non-tech-check'>
                                                    <label class="custom-check-box-container">
                                                    {this.state.existing?<input onChange={this.handleChangeCheckbox} checked type="checkbox" name="existing"/>:<input onChange={this.handleChangeCheckbox} type="checkbox" name="existing"/>}
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    {console.log("is check after cheecked", this.state.existing)}
                                                </div>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr class="even">
                                            <td class="table-title" width="50%" >
                                                Free Trial
                                           </td>
                                            <td width="30%">
                                                <Input
                                                    type={'text'}
                                                    name={'trialPeriod'}
                                                    value={Math.round(this.state.trialPeriod)}
                                                    handleChange={this.handleChangeInput}
                                                    id={'trialPeriod'}
                                                />
                                            </td>
                                            <td>
                                                <span class="free-trial">Months</span>
                                            </td>
                                        </tr>
                                        <tr class="odd">
                                            <td class="table-title" width="50%" >
                                                Video Consultation with new clients
                                           </td>
                                            <td width="30%">
                                                <div className='non-tech-check'>
                                                    <label class="custom-check-box-container">
                                                     {this.state.videoConsultation?<input onChange={this.handleChangeCheckbox} checked type="checkbox" name="videoConsultation"/>:<input onChange={this.handleChangeCheckbox} type="checkbox" name="videoConsultation"/>}
                                                        
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr class="last">
                                            <td class="table-title" width="50%" >
                                                Use LawOn’s features with your
                                                 existing clients
                                           </td>
                                            <td width="30%">
                                                <div className='non-tech-check'>
                                                    <label class="custom-check-box-container">
                                                    {this.state.lawonFeatures?<input onChange={this.handleChangeCheckbox} checked type="checkbox" name="lawonFeatures"/>:<input onChange={this.handleChangeCheckbox} type="checkbox" name="lawonFeatures"/>}
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    </table>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">
                            <Link to='/main/dashboardmaster/manageplan'>
                                <Button
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"

                                />
                            </Link>
                            <Button
                                text="Update Plan"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.updatePlan()}
                            />
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

const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AdminEditPlan)



