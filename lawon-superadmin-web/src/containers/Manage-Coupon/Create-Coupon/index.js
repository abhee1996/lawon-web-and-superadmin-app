import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
import queryString from 'query-string';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux'

const Theme = createMuiTheme(
    {
        palette:
        {
            primary:
            {
                main: '#feb41d'
            },
            secondary:
            {
                main: '#fafafa'
            }
        }
    }
)

class CreateCoupon extends Component {
    state = {

    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            code: '',
            noOfUsage: '',
            discount: '',
            selectedFirm: '',
            couponType: 'Percent',
            isPercentage: false,
            selectedCouponID: '',
            ValidFrom: new Date(),
            ValidTill: new Date(),

        }
    }
    validFromHandleChange = (date) => {

        this.setState({
            ValidFrom: date
        });
        console.log("date", this.state.ValidFrom)
    };
    validTillHandleChange = (date) => {

        this.setState({
            ValidTill: date
        });
        console.log("date", this.state.ValidTill)

    };
    handlecheckPackage = (event) => {
        if (event.target.checked == true) {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check true", this.state.isPercentage)
        }
        else {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check false", this.state.isPercentage)
        }
    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("coupon", this.state.couponType)
    }
    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log('params.selectedCoupon', params.selectedCoupon)
        this.setState({
            selectedCouponID: params.selectedCoupon
        })
    }

    async saveCoupon(code, discount, noOfUsage, isPercentage) {
      
        if (
            this.validator.fieldValid('Code'),
            this.validator.fieldValid('Counter'),
            this.validator.fieldValid('ValidFrom'),
            this.validator.fieldValid('ValidTill'),
            this.validator.fieldValid('Amount'),
            this.validator.fieldValid('selectFirm')

        ) {
            this.props.onStart()
            const dataToBeSent = {
                code: this.state.code,
                discount: this.state.discount,
                noOfUsage: this.state.noOfUsage,
                isPercentage: this.state.isPercentage,
                validFrom: this.state.ValidFrom,
                validTo: this.state.ValidTill,
                couponType: this.state.couponType
            }
            var responsevar = await adminAPIs.adminCreateCoupons(dataToBeSent);
            console.log('responsevar', responsevar);
            console.log('coupon', this.state.couponcode);
            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/managecoupon/',

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
    render() {

        return (
            <div class="main">

                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Create Coupon
                </div>
                    <div class="sub-heading"></div>
                </div>
                <div class="create-coupon-section">
                    <div class="row bg">
                        <div class="col-md-12 margin">
                            <div class="category-text">Coupon Code*</div>
                            <div class="col-md-4 no-padding">
                                <Input
                                    type={'text'}
                                    name={'code'}
                                    placeholder={'Code'}
                                    handleChange={this.handleChangeInput}
                                    id={'code'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('Code', this.state.code, 'required|alpha_num')}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 margin">
                            <div class="category-text">Counter*</div>
                            <div class="col-md-4 no-padding">
                                <Input
                                    type={'text'}
                                    name={'noOfUsage'}
                                    placeholder={'Counter'}
                                    handleChange={this.handleChangeInput}
                                    id={'noOfUsage'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('Counter', this.state.noOfUsage, 'required|numeric')}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 margin">
                            <div class="category-text">Valid From*</div>
                            <div class="col-md-4 no-padding">
                                <div class="col-md-12 no-padding">
                                    <div class="col-md-6 no-padding p-r-5">
                                        <DatePicker
                                            selected={this.state.ValidFrom}
                                            onChange={this.validFromHandleChange}
                                            name="ValidFrom"
                                        />
                                        <span class="danger-text">
                                            {this.validator.message('ValidFrom', this.state.ValidFrom, 'required')}
                                            {console.log("this is Valid From", this.state.ValidFrom)}
                                        </span>
                                    </div>
                                    <div class="col-md-6 no-padding p-l-5">
                                        <DatePicker
                                            selected={this.state.ValidTill}
                                            onChange={this.validTillHandleChange}
                                            name="ValidTill"
                                            class="date-picker"
                                        />  <span class="danger-text">
                                            {this.validator.message('ValidFrom', this.state.ValidTill, 'required')}
                                            {console.log("this is Valid Till", this.state.ValidTill)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 margin">
                            <div class="category-text">Amount*</div>
                            <div class="col-md-4 no-padding">
                                <div class="col-md-12 no-padding">
                                    <div class="col-md-6 no-padding p-r-5">
                                        <Input
                                            type={'text'}
                                            name={'discount'}
                                            placeholder={'Amount'}
                                            handleChange={this.handleChangeInput}
                                            id={'discount'}
                                        />

                                        <div class="col-md-6 no-padding overlap-coupon-type ">
                                            <select class="form-control" name='couponType' onChange={this.handleChangeInput}>

                                                <option value="percent">Percent</option>
                                                <option value="currency">currency</option>
                                            </select>

                                        </div>

                                        <span class="danger-text">
                                            {this.validator.message('Amount', this.state.discount, 'required|numeric')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="category-text">
                                Select Firm*
                                </div>
                            <div class="col-md-4 no-padding">
                                <select class="form-control" id={'selectedfirm'} name='selectedFirm' onChange={this.handleChangeInput}>
                                    <option>Please Select</option>
                                    <option >Property</option>
                                    <option >Property</option>
                                </select>
                                <span class="danger-text">
                                    {this.validator.message('selectFirm', this.state.selectedFirm, 'required')}
                                </span>
                            </div>
                        </div>




                        <div class="col-md-12">
                            <div class="category-text">
                                Status*
                                <MuiThemeProvider theme={Theme}>
                                    <Switch
                                        onChange={this.handlecheckPackage}
                                        value="checkedA"
                                        color='primary'
                                    />
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">
                            <Link to='/main/dashboardmaster/managecoupon'>
                                <Button
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"
                                />
                            </Link>
                            <Button
                                text="Save Coupon"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.saveCoupon()}

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
      onComplete: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0})
   
    }
  }


export default connect(null, mapDispatchToProps)(CreateCoupon)


