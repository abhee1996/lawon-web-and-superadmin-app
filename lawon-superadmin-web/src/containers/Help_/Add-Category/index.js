import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
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

class AddNewCategory extends Component {
    state = {

    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            CategoryName: "",
            sort: null,
            isActive: false,

        }
    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("Select Firm", this.state.CategoryName)
    }
    handlecheckPackage = (event) => {
        if (event.target.checked == true) {
            this.setState({
                isActive: event.target.checked
            })
            console.log("is check true")
        }
        else {
            this.setState({
                isActive: event.target.checked
            })
            console.log("is check false")
        }
    }
    async saveArticle() {
       
        if (
            this.validator.fieldValid('CategoryName'),
            this.validator.fieldValid('sort')
        ) {
            this.props.onStart()
            const dataToBeSent = {
                name: this.state.CategoryName,
                isActive: this.state.isActive,
                sort: this.state.sort
            }
            var responsevar = await adminAPIs.createAdminHelpArticleCategory(dataToBeSent);
            console.log('responsevar', responsevar);

            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/help/',

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
                        Add New Category
                </div>
                    <div class="sub-heading"></div>
                </div>

                <div class="admin-create-categories-section">
                    <div class="row bg">

                        <div class="col-md-12 margin">
                            <div class="category-text">Category Name*</div>
                            <div class="col-md-4 no-padding">
                                <Input
                                    type={'text'}
                                    name={'CategoryName'}
                                    placeholder={'Article Category Name'}
                                    handleChange={this.handleChangeInput}
                                    id={'CategoryName'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('CategoryName', this.state.CategoryName, 'required')}
                                </span>
                            </div>

                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">sort*</div>
                                <div class="form-group">
                                    <input
                                        type='number'
                                        name='sort'
                                        placeholder='select number'
                                        id='sort'
                                        min="1"
                                        max="10"
                                        class="form-control"
                                        onChange={this.handleChangeInput}
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('sort', this.state.sort, 'required')}
                                    </span>
                                </div>
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
                            <Link to='/main/dashboardmaster/help'>
                                <Button
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"

                                />
                            </Link>
                            <Button
                                text="Save Category"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.saveArticle()}
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

  export default connect( null,mapDispatchToProps)(AddNewCategory)


