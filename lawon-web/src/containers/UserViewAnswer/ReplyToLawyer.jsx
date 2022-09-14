import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button } from '@material-ui/core';

import * as actions from "../../actions/user/questions";

class ReplyToLawyer extends Component {
  state = {
    replyContent: "",
    media: ""
    //   media:'https://i.picsum.photos/id/1/200/200.jpg',
  };

  handleChangeFile = ({ target }) => {
    this.setState({
      media: target.files[0]
    });
  };

  replyText = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  replyApply = () => {
    const { handleReply } = this.props;
    const { replyContent, media } = this.state;
    handleReply({ replyContent, media, });
  };

  render() {
    const { replyContent } = this.state;
    return (
      <div className="drawer-up-doc">
        <div class="right-side-dark-para">REPLY TO LAWYER</div>
        <div class="form-group pt-10">
          <TextField
            style={{ width: '100%' }}
            multiline={true}
            rows={4}
            variant='outlined'
            value={replyContent}
            name='replyContent'
            onChange={this.replyText}
            placeholder="Type your reply here"
          />
        </div>
        <div className="float-left display-inline">
          <input
            type="file"
            text="Upload File"
            onChange={this.handleChangeFile}
          />
        </div>

        <div className="float-right">
          <Button
            disabled={!replyContent.trim()}
            variant='contained'
            color='primary'
            disableRipple
            onClick={this.replyApply}>
            Reply
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  };
};

export default connect(mapStateToProps, actions)(ReplyToLawyer);
