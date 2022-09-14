import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux'

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
class AddBlog extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            heading: "",
            editorState: EditorState.createEmpty(),
            blogCategoryId: null,
            ImageURL: 'images/dummyupload.png',
            imageFile: "",
            isActive: false,
            isPublished: false,
            sort: null,
        }
    }
    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
        console.log("editor state", this.state.editorState)
    };
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

    }
    handleChangeFile = event => {
        this.setState({
            imageURL: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        })
        console.log("image added")
    }
    async addBlog() {
        var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        console.log("my converted data", convertedData)
        var myJSON = JSON.stringify(convertedData)
        console.log("my JSON STringify data", myJSON)
        if (
            this.validator.fieldValid('heading'),
            this.validator.fieldValid('blogCategoryId')

        ) {
            this.props.onStart()
            console.log("submitted...")
            const dataObj = {
                heading: this.state.heading,
                content: myJSON,
                media: this.state.file,
                BlogCategoryId: this.state.blogCategoryId,
                sort: this.state.sort,
                isActive: this.state.isActive,
                isPublished: this.state.isPublished,
                authorName: this.props.AdminInfo[0].firstName+''+this.props.AdminInfo[0].lastName
            }
            const datafile = new FormData();
            for (let item in dataObj) {
                if (dataObj[item] != null) {
                    console.log("data to be sent is not empty ", dataObj[item])
                    datafile.append(item, dataObj[item]);
                }
            }
            var responsevar = await adminAPIs.adminCreateBlog(datafile);
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
                                <div class="category-text">Blog Heading*</div>
                                <div class="col-md-12 no-padding">
                                    <Input
                                        type={'text'}
                                        name={'heading'}
                                        placeholder={'heading'}
                                        handleChange={this.handleChangeInput}
                                        id={'heading'}
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('heading', this.state.heading, 'required')}
                                    </span>
                                </div>

                            </div>
                            <div class="col-md-12 margin">
                                <div class="category-text"></div>
                                <div class="col-md-12 no-padding border">
                                    <Editor
                                        editorState={this.state.editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onEditorStateChange}
                                    />

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
                                        Blog Category Icon
                        </div>
                                    <div className='user-img-box'>
                                        <input type="file" onChange={this.handleChangeFile} />
                                        <img className="image" src={this.state.imageURL} />
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
                                    Publish*
                               <MuiThemeProvider theme={Theme}>
                                        <Switch
                                            onChange={this.handlecheckPackage}
                                            value="checkedA"
                                            color='primary'
                                            name="isPublished"
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
                                </MuiThemeProvider>
                            </div>
                        </div>

                        </div>
                        <div class="col-md-6">
                            <div class="category-text">Blog Categories*</div>
                            <ul class="blog-catgory-names-ul">
                                {this.props.BlogCategories.map((item => <li>
                                    <input
                                        type="radio"
                                        name="blogCategoryId"
                                        value={item.id}
                                        onChange={this.handleChangeInput}
                                    />
                                    <label for="scales">{item.name}</label>
                                </li>
                                ))}
                            </ul>
                            <span class="danger-text">
                                {this.validator.message('blogCategoryId', this.state.blogCategoryId, 'required')}
                            </span>
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
                                text="Add Blog"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.addBlog()}

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
        BlogCategories: state.BlogCategories,
        AdminInfo: state.AdminInfo

    };
};
const mapDispatchToProps = dispatch => {
    return {
      onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
      onComplete: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0})
   
    }
  }

export default connect(mapStoreToProps,mapDispatchToProps)(AddBlog)


