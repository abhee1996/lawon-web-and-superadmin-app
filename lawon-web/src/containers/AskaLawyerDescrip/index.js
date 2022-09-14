import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, createMuiTheme, MuiThemeProvider, Button, IconButton, CircularProgress } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { round } from 'lodash';

import * as actions from "../../actions/user/questions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 13
  }
});

const fn = Intl.NumberFormat();

class AskALawyerDescription extends Component {
  state = {
    title: "",
    problem: "",
    attachments: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = () => {
    const { history, submitQuestion, askQuestion } = this.props;
    const { title, problem, attachments } = this.state;

    const { selectedSubcategory } = askQuestion || {};
    const { id } = selectedSubcategory || {}

    submitQuestion({
      subcategoryId: id,
      title,
      problem,
      file: attachments
    })
      .then(({ newQuestion }) => {
        if (newQuestion) {
          history.push("/main/askalawyerconfirm");
        }
      });
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleChangeFile = ({ target: { files } }) => {
    if (files && files.length) {
      const { attachments } = this.state;
      
      for (let index = 0; index < files.length; index++) {
        if (!attachments.some((attachment) => attachment.name === files[index].name))
          attachments.push(files[index]);
      }
      this.setState({ attachments });
    }
  };

  handleRemoveFile = (name) => {
    let { attachments } = this.state;

    attachments = attachments.filter((file) => file.name !== name);
    this.setState({ attachments });
  };

  handleOnBack = (categoryName, subcategoryName) => {

    this.props.history.push({
      pathname: "/main/askalawyer",
      state: { categoryName, subcategoryName }
    });
  };

  render() {
    const { askQuestion } = this.props;
    const { attachments, title, problem } = this.state;
    const { selectedCategory, selectedSubcategory } = askQuestion || {};

    if (!selectedCategory || !selectedSubcategory) {
      window.location = '#/main/askalawyer';
    }

    const { name: categoryName } = selectedSubcategory || {};
    const { name: subcategoryName } = selectedSubcategory || {};

    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <div className="container">
            <div className="add-details-box">
              <h2>Ask a Lawyer</h2>
              <div className="top-breadcrumb gray">
                <span>{categoryName}</span>
                <span> / </span>
                <span>{subcategoryName}</span>
              </div>
              <div className="row asklawyer-desc">
                <div className="category-row">
                  <div className="select-cat-label">How can we help you ?</div>
                  <div className="form-group">
                    <TextField
                      style={{ width: '100%' }}
                      value={title}
                      placeholder='Title your question'
                      variant='outlined'
                      name='title'
                      onChange={this.handleChangeInput}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      style={{ width: '100%' }}
                      multiline={true}
                      rows={6}
                      variant='outlined'
                      value={problem}
                      name='problem'
                      onChange={this.handleChangeInput}
                      placeholder="Describe your problem"
                    />
                  </div>
                  <div className="asklawyer-btns">
                    <div className="float-left upload-ask ">
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id='btn-upload'
                        multiple
                        type="file"
                        onChange={this.handleChangeFile}
                      />
                      <label htmlFor='btn-upload'>
                        <Button
                          variant='outlined'
                          component="span"
                          color='primary'>
                          Upload
                        </Button>
                      </label>
                    </div>
                    <div className="float-right">
                      <Button
                        disabled={!title || !problem || problem.length <= 10}
                        color='primary'
                        variant='contained'
                        onClick={this.handleSubmit}>
                        Ask a lawyer
                      </Button>
                    </div>
                  </div>
                  <div className="qfile-name">
                    {attachments.map(({ name, size }) => {
                      return (
                        <div
                          key={name}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '50%',
                            borderBottom: '1px solid #ebeff1'
                          }}>
                          <div class="right-side-bold-yellow" style={{ marginLeft: '10px' }}>{name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ width: '100px' }}>{fn.format(round(size / 1000).toFixed(0))} kb</div>
                            <IconButton
                              onClick={() => this.handleRemoveFile(name)}
                              style={{ marginTop: '0px', color: 'red' }}>
                              <HighlightOff />
                            </IconButton>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-blacknav">
            <div className="text-center">
              <span className="float-left" onClick={() => this.handleOnBack(categoryName, subcategoryName)}>
                <i className="fa fa-chevron-left"></i>
                Back
              </span>
              <span>
                Category <i className="fa fa-chevron-right"></i>
              </span>
              <span>
                <span style={{ color: "#FEB41C" }}>Question</span>
                <i className="fa fa-chevron-right"></i>
              </span>
              <span> Confirmation</span>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  };
};

export default connect(mapStateToProps, actions)(AskALawyerDescription);
