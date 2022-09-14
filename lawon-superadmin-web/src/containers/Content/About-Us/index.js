import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'

class AboutUS extends Component {
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            title: "",
            editorState: EditorState.createEmpty(),
            aboutId:null
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
    async componentDidMount() {
        var responsevar = await adminAPIs.adminGetAppContent();
       
        if (responsevar.code == 200 || responsevar.code == 201) {
           console.log(responsevar.data)
           
            
                this.setState({
                    aboutId:responsevar.data.id
                })
        
        }
        else {
          console.log('responsevar failed')
        }
    
      }
    async publishAboutUs() {
        this.props.start()
        var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        console.log("my converted data", convertedData)
        var myJSON = JSON.stringify(convertedData)
        console.log("my JSON STringify data", myJSON)
        const dataToBeSent = {
            title: this.state.title,
            description: myJSON,
            type: "about",
            id:this.state.aboutId

        }
        var responsevar = await adminAPIs.adminAboutUs(dataToBeSent);
        console.log('responsevar', responsevar);

        if (responsevar.code == 200 || responsevar.code == 201) {
           this.props.onComplete()
            this.props.history.push({
                pathname: '/main/dashboardmaster/superadmindashboard',

            });
            this.props.onCompleted()
        }
        else {
            console.log('Problem in register')

        }


    }
    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Manage About Us
                    </div>
                    <div class="sub-heading"></div>
                </div>

                <div class="admin-create-categories-section admin-blog-section">
                    <div class="row bg">

                        <div class="col-md-12 margin">
                            <div class="category-text"> Title*</div>
                            <div class="col-md-8 no-padding">
                                <Input
                                    type={'text'}
                                    name={'title'}
                                    placeholder={'Title'}
                                    handleChange={this.handleChangeInput}
                                    id={'title'}
                                />
                            </div>

                        </div>
                        <div class="col-md-12 margin">
                            <div class="category-text"></div>
                            <div class="col-md-8 no-padding border">
                                <Editor
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}

                                />

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
                                text="Publish"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.publishAboutUs()}

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

export default connect(null, mapDispatchToProps)(AboutUS)


