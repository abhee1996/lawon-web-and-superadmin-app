import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../../components/atoms/YellowButton'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import queryString from 'query-string';
import { EditorState, convertToRaw } from 'draft-js';
var editAnswer
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

class EditArticle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            question: "",
            editorState: EditorState.createEmpty(),
            isActive: false,
            articleSort: null,
            FaqCategoryId: null,


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
        console.log("name", event.target.value)
        console.log("Select Firm", localStorage.getItem("userAccessToken"))
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
    blogDetail = (e) => {
        this.props.history.push({
          pathname: '/NavbarHome/homepage#/main/blogdetails',
          search: 'selectedblog=' + e,
        })
        localStorage.setItem('selectedBlog', e)
    
      }
    componentDidMount() {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        console.log('params.selectedhelarticle', params.selectedhelarticle)

        this.props.HelpArticleInfo.filter(item => item.id == params.selectedhelarticle).map((item =>
            this.setState({
                question: item.question,
                answer: item.answer,
                isActive: item.status,
                articleSort: item.sort,
                FaqCategoryId: item.FaqCategoryId

            })

        ))
        editAnswer = this.state.answer
        console.log("editAnswer ", this.state.isActive)
    }

    async updateArticle() {
        this.props.onStart()

        var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        console.log("my converted data", convertedData)
        var myJSON = JSON.stringify(convertedData)
        console.log("my JSON STringify data", myJSON)
        const dataToBeSent = {
            question: this.state.question,
            answer: myJSON,
            status: this.state.isActive,
            sort: this.state.articleSort,
            FaqCategoryId: this.state.FaqCategoryId
        } 




        var responsevar = await adminAPIs.updateAdminHelpArticle(dataToBeSent);

        console.log('Response Var', responsevar);
        if (responsevar.code == 200 || responsevar.code == 201) {
            this.props.onComplete()
            localStorage.removeItem('couponId')
            console.log("success")
            this.props.history.push({
                pathname: '/main/dashboardmaster/help',

            });
            this.props.onCompleted()
        }
    }



    render() {

        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Add New Article
            </div>
                    <div class="sub-heading"></div>
                </div>

                <div class="admin-create-categories-section">
                    <div class="row bg">
                        <div class="col-md-6">
                            <div class="col-md-12 ">
                                <div class="col-md-12 no-padding">
                                    <div class="category-text">Question*</div>
                                    <div class="form-group">
                                        <textarea
                                            class="form-control"
                                            name="question"
                                            id="question"
                                            rows="5"
                                            onChange={this.handleChangeInput}
                                            value={this.state.question}
                                        >

                                        </textarea>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 margin">
                                <div class="category-text">Answer*</div>
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
                            <div class="col-md-12 ">
                                <div class="col-md-12 no-padding">
                                    <div class="category-text">sort*</div>
                                    <div class="form-group">
                                        <input
                                            type='number'
                                            name='articleSort'
                                            value={this.state.articleSort}
                                            id='articleSort'
                                            min="1"
                                            max="10"
                                            class="form-control"
                                            onChange={this.handleChangeInput}

                                        />
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
                                            checked={this.state.isActive}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="category-text">Category Name*</div>
                            <ul class="blog-catgory-names-ul">
                                {this.props.HelpArticleCategories.map((item => <li>
                                    {this.state.FaqCategoryId === item.id ? <input
                                        type="radio"
                                        name="FaqCategoryId"
                                        value={item.id}
                                        onChange={this.handleChangeInput}
                                        checked="checked"

                                    /> : <input
                                            type="radio"
                                            name="FaqCategoryId"
                                            value={item.id}
                                            onChange={this.handleChangeInput}


                                        />}
                                    <label for="scales">{item.name}</label>
                                </li>
                                ))}
                            </ul>
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
                                text="Save Article"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.updateArticle()}
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
        HelpArticleCategories: state.HelpArticleCategories,
        HelpArticleInfo: state.HelpArticleInfo

    };
};
const mapDispatchToProps = dispatch => {
    return {
      onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
      onComplete: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0})
   
    }
  }


export default connect(mapStoreToProps, mapDispatchToProps)(EditArticle)
