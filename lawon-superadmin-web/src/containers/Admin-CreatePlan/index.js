import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../components/atoms/InputField'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { adminAPIs } from '../../apiConstants/adminAPIs';
import queryString from 'query-string';
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
class AdminCreatePlan extends Component {
    state = {
        name: "",
        monthlyFee: "",
        annualFee: "1000",
        noOfLawyers: "",
        noOfServices: "",
        mileRadius: "",
        trialPeriod: "",
        oneTimeSetupFee: "1",
        introducerFee: "1",
        existing: "",
        accessToNewEnquiries: "false",
        whatsapp: "false"
    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
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
            sort: "",
            lawonFeatures: false,

        }
    }


    async saveNewPakage() {
        if (
            this.validator.fieldValid('name'),
            this.validator.fieldValid('monthlyFee'),
            this.validator.fieldValid('noOfLawyers'),
            this.validator.fieldValid('noOfServices'),
            this.validator.fieldValid('mileRadius'),
            this.validator.fieldValid('trialPeriod'),
            this.validator.fieldValid('sort')


        ) {this.props.onStart()
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
            var responsevar = await adminAPIs.adminCreatePlan(dataToBeSent);
            console.log('responsevar', responsevar);

            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/manageplan/',

                });
                this.props.onCompleted()
            }
            else {
                console.log('Problem in register')

            }
        }
        else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();

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
                                    placeholder={'Sample Title'}
                                    handleChange={this.handleChangeInput}
                                    id={'name'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('name', this.state.name, 'required|alpha')}
                                </span>
                            </div>

                            <div class="col-md-12 margin">

                                <Input
                                    type={'text'}
                                    name={'monthlyFee'}
                                    placeholder={'£0'}
                                    handleChange={this.handleChangeInput}
                                    id={'monthlyFee'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('monthlyFee', this.state.monthlyFee, 'required|num')}
                                </span>
                            </div>
                            <div class="col-md-12   no-padding">
                            <div class="     no-padding">
                               <div class="form-group">
                                    <input
                                        type='number'
                                        name='sort'
                                        placeholder='sort'
                                        id='screenPosition'
                                        min="1"
                                        max="10"
                                        class="form-control"
                                        onChange={this.handleChangeInput}
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('sort', this.state.sort, 'required|numeric')}
                                    </span>
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
                                                    placeholder={'0'}
                                                    handleChange={this.handleChangeInput}
                                                    id={'noOfLawyers'}
                                                />
                                                <span class="danger-text">
                                                    {this.validator.message('noOfLawyers', this.state.noOfLawyers, 'required|num')}
                                                </span>
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
                                                    placeholder={'0'}
                                                    handleChange={this.handleChangeInput}
                                                    id={'noOfServices'}
                                                />
                                                <span class="danger-text">
                                                    {this.validator.message('noOfServices', this.state.noOfServices, 'required|num')}
                                                </span>
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
                                                    placeholder={'0'}
                                                    handleChange={this.handleChangeInput}
                                                    id={'mileRadius'}
                                                />
                                                <span class="danger-text">
                                                    {this.validator.message('mileRadius', this.state.mileRadius, 'required|num')}
                                                </span>
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
                                                        <input onChange={this.handleChangeCheckbox} type="checkbox" name="accessToNewEnquiries" />
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
                                                        <input 
                                                            onChange={this.handleChangeCheckbox}
                                                            name="existing" 
                                                            type="checkbox" />
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
                                                    placeholder={'0'}
                                                    handleChange={this.handleChangeInput}
                                                    id={'trialPeriod'}
                                                />
                                                <span class="danger-text">
                                                    {this.validator.message('trialPeriod', this.state.trialPeriod, 'required|num')}
                                                </span>
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
                                                        <input onChange={this.handleChangeCheckbox} type="checkbox" name="videoConsultation" />
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
                                                        <input onChange={this.handleChangeCheckbox} type="checkbox" name="lawonFeatures" />
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
                                text="Save New Package"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.saveNewPakage()}
                            />
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(null, mapDispatchToProps)(AdminCreatePlan)


