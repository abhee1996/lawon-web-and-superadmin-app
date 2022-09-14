import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
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
class AddBlogCategory extends Component {
    state = {
        userImageURL: 'images/dummyupload.png',
        userFile: "",
        name: "",
        isActive: false,

    }
    constructor(props) {

        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {

            name: "",
            isActive: false,
            userImageURL: 'images/dummyupload.png',
            userFile: "",
            sort: null,
        }
    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("Select Firm", localStorage.getItem("userAccessToken"))
    }
    handleChangeFile = event => {
        this.setState({
            userImageURL: URL.createObjectURL(event.target.files[0]),
            userFile: event.target.files[0],

        })
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
    async saveBlogCategory() {
        if (
            this.validator.fieldValid('name'),
            this.validator.fieldValid('sort')

        ) {
            this.props.onStart()
            console.log("submitted...")
            console.log("is check false", this.state.isActive)
            const dataObj = {
                name: this.state.name,
                isActive: this.state.isActive,
                media: this.state.userFile,
                sort: this.state.sort,
            }
            const datafile = new FormData();
            for (let item in dataObj) {
                if (dataObj[item] != null) {
                    console.log("data to be sent is not empty ", dataObj[item])
                    datafile.append(item, dataObj[item]);
                }
            }
            var responsevar = await adminAPIs.adminCreateBlogsCategory(datafile);
            console.log('responsevar', responsevar);
            console.log('accesstokken', localStorage.getItem("userAccessToken"))

            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/manageblog1',

                });
                this.props.onCompleted()
            }
            else {
                console.log('Problem in register')
                console.log('not submitted')
            }
        } else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
            console.log("not submitted...")
        }
    }
    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Create Blog Post
                    </div>
                    <div class="sub-heading"></div>
                </div>

                <div class="admin-create-categories-section admin-blog-section">
                    <div class="row bg">
                        <div class="col-md-6">
                            <div class="col-md-12 margin">
                                <div class="category-text">Title*</div>
                                <div class="col-md-12 no-padding">
                                    <Input
                                        type={'text'}
                                        name={'name'}
                                        placeholder={'Category Name'}
                                        handleChange={this.handleChangeInput}
                                        id={'name'}
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('name', this.state.name, 'required|alpha_space')}
                                    </span>
                                </div>

                            </div>
                            <div class="col-md-12 margin">
                                <div class="category-text">Sort*</div>
                                <div class="col-md-12 no-padding">
                                    <input
                                        type='number'
                                        name='sort'
                                        placeholder='select number'
                                        id='screenPosition'
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
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">

                            <Link to='/main/dashboardmaster/manageblog1'>
                                <Button
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"

                                />
                            </Link>
                            <Button
                                text="Add Blog Category"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.saveBlogCategory()}
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

export default connect(null,mapDispatchToProps)(AddBlogCategory)

