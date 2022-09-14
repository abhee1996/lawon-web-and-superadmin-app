import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import queryString from 'query-string';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
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
class EditBlog extends Component {
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
            adminImageURL: 'images/dummyupload.png',
            adminFile: "",
            isActive: false,
            sort: null,
            CategoryBlogsId: null,
            isPublished: false,
        }
    }
    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
        console.log("editor state", this.state.editorState)
    };
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
            adminImageURL: URL.createObjectURL(event.target.files[0]),
            adminFile: event.target.files[0]
        })
        console.log("image added")
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
    async updateBlog() {
        var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        console.log("my converted data", convertedData)
        var myJSON = JSON.stringify(convertedData)

        this.props.onStart()
        const dataToBeSent = {
            heading: this.state.heading,
            content: myJSON,
            media: this.state.adminFile,
            BlogCategoryId: this.state.blogCategoryId,
            sort: this.state.sort,
            isActive: this.state.isActive,
            isPublished: this.state.isPublished
        }
        const datafile = new FormData();
        for (let item in dataToBeSent) {
            if (dataToBeSent[item] != null) {
                console.log("data to be sent is not empty ", dataToBeSent[item])
                datafile.append(item, dataToBeSent[item]);
            }
        }
        var responsevar = await adminAPIs.adminEditBlog(datafile);

        if (responsevar.code == 200 || responsevar.code == 201) {
            this.props.onComplete()
            localStorage.removeItem('editBlogId')
            console.log("success")
            this.props.history.push({
                pathname: '/main/dashboardmaster/manageblog1',

            });
            this.props.onCompleted()
        }
    }

    componentDidMount() {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        console.log('params.selectedCoupon', params.selectedblog)

        this.props.CategoryBlogs.filter(item => item.id == params.selectedblog).map((item => {
            console.log(item.BlogCategoryId)
            this.setState({
                heading: item.heading,
                content: item.content,
                blogCategoryId: item.BlogCategoryId,
                adminImageURL: item.imageUrl,
                adminFile: "",
                isActive: item.isActive,
                sort: item.sort,
                CategoryBlogsId: item.id,
                isPublished: item.isPublished,
            })

        }))

    }
    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Edit Blog Post
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
                                        value={this.state.heading}
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
                                        value={this.state.content}
                                    />

                                </div>
                            </div>
                            <div class="col-md-12 margin">
                                <div class="category-text">Sort*</div>
                                <div class="col-md-12 no-padding">
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
                                        <img className="image" src={this.state.adminImageURL} />
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
                                            value={this.state.isPublished}
                                            color='primary'
                                            name="isPublished"
                                            checked={this.state.isPublished}
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
                                            value={this.state.isActive}
                                            color='primary'
                                            name="isActive"
                                            checked={this.state.isActive}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            </div>


                        </div>
                        <div class="col-md-6">
                            <div class="category-text">Blog Categories*</div>
                            <ul class="blog-catgory-names-ul">
                                {this.props.BlogCategories.map((item => <li>
                                    {console.log(this.state.blogCategoryId)}
                                    {console.log(item.id)}
                                    {this.state.blogCategoryId == item.id ?

                                        <input
                                            type="radio"
                                            name="blogCategoryId"
                                            value={item.id}
                                            onChange={this.handleChangeInput}
                                            checked="checked"
                                        /> : <input
                                            type="radio"
                                            name="blogCategoryId"
                                            value={item.id}
                                            onChange={this.handleChangeInput}
                                        />}
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
                                text="Update Blog"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.updateBlog()}

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
        CategoryBlogs: state.CategoryBlogs

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditBlog)

