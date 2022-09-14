import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import SimpleReactValidator from 'simple-react-validator';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
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
class CreateCategory extends Component {
    state = {
        userImageURL: 'images/user-dummyprofile.png',
        userFile: "",
    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            newCategory: 'false',
            name: '',
            description: '',
            sort: '',
            isActive: 'false',
            includeMenu: "false",
            isNonTechnical: "",
            userImageURL: 'images/dummyupload.png',
            userFile: "",
        }
    }
    handleChangeFile = event => {
        this.setState({
            // userImageURL: URL.createObjectURL(event.target.files[0]),
            userFile: event.target.files[0]
        })
    }
    handlecheckPackage = (event) => {
        if (event.target.checked == true) {
            this.setState({
                [event.target.name]: event.target.checked,
            })
            console.log("is check true")
        }
        else {
            this.setState({
                [event.target.name]: event.target.checked,

            })
            console.log("is check false")
        }
    }

    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)

        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("sort is triggered")
    }

    async saveCategory() {
        if (

            this.validator.fieldValid('name'),
           this.validator.fieldValid('sort')



        ) {
            // this.props.onStart()
            console.log('submitted')
            const dataObj = {
                name: this.state.name,
                isActive: this.state.isActive,
                media: this.state.userFile,
                description: this.state.description,
                sort: this.state.sort,
                includeMenu: this.state.includeMenu
            }

            const datafile = new FormData();
            for (let item in dataObj) {
                if (dataObj[item] != '') {
                    console.log("data to be sent is not empty ", dataObj[item])
                    //dataToBeSent[item] = dataObj[item];
                    datafile.append(item, dataObj[item]);
                }
            }
            console.log('Datafile obj', datafile);
            var responsevar =''// await adminAPIs.adminCreateCategories(datafile);
            console.log('responsevar', responsevar);
            console.log('accesstokken', localStorage.getItem("userAccessToken"))

            if (responsevar.code == 200 || responsevar.code == 201) {
                // this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/categories',

                });
                // this.props.onCompleted()
            }
            else {
                console.log('Problem in register')
                console.log('not submitted')
            }
        }
        else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
            console.log('not submitted')
        }
    }

    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Create New Category
                </div>
                    <div>
                        <Link to="/main/dashboardmaster/adminsubcategory">
                            <button class="create-sub-plan-btn">
                                <i class="fa fa-plus-circle"></i>Create Subcategory
                        </button>
                        </Link>
                        <Link to='/main/dashboardmaster/createcategory'>
                            <button class="create-new-plan-btn m-r-25">
                                <i class="fa fa-plus-circle "></i>Create Category
                            </button>
                        </Link>
                    </div>
                    <div class="sub-heading"></div>
                </div>

                <div class="admin-create-categories-section">
                    <div class="row bg">
                        <div class="col-md-12">
                            <div class="non-tech-check">
                                <label class="custom-check-box-container ">
                                    New Category
                                        <input type="checkbox" name="newCategory" onChange={this.handleChangeCheckBox} />
                                    <span class="checkmark">
                                    </span>
                                </label>

                            </div>
                        </div>
                        <div class="col-md-12 margin">
                            <div class="category-text">Title*</div>
                            <div class="col-md-4 no-padding">
                                <Input
                                    type={'text'}
                                    name={'name'}
                                    placeholder={'Title'}
                                    handleChange={this.handleChangeInput}
                                    id={'name'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('name', this.state.name, 'required|alpha_space')}
                                </span>
                            </div>

                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">Description*</div>
                                <div class="form-group">
                                    <textarea class="form-control" rows="5" id="description" name="description" onChange={this.handleChangeInput}></textarea>
                                   
                                </div>
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
                                    {this.validator.message('sort', this.state.sort, 'required|num')}
                                    </span>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">
                                    Category Image / Icon
                                    </div>
                                <div className='user-img-box'>
                                    <input type="file" onChange={this.handleChangeFile} />
                                    <img className="image" src={this.state.userImageURL} />
                                    <div class="middle">
                                        <div class="text">
                                            <div className='upload-icon'>
                                                <i className='fa fa-upload'></i>
                                            </div>
                                            <div> Upload Profile Photo</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="category-text">
                                Include Menu*
                                <MuiThemeProvider theme={Theme}>
                                    <Switch
                                        onChange={this.handlecheckPackage}
                                        value="checkedA"
                                        color='primary'
                                        name="includeMenu"
                                    />
                                  
                                </MuiThemeProvider>
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
                                        name="isActive"
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('isActive', this.state.isActive, 'required')}
                                    </span>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">
                            <Link to='/main/dashboardmaster/categories'>
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
                                onClick={() => this.saveCategory()}
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

export default connect(null, mapDispatchToProps)(CreateCategory)
