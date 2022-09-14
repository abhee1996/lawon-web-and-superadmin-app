import React, { Component} from "react";
import { Backdrop, Avatar, Snackbar ,CircularProgress} from '@material-ui/core';
import { connect } from "react-redux";
import moment from "moment";

import EnquiryAttachment from './EnquiryAttachment';
import EnquiryNotes from './EnquiryNotes';
import Conversation from './Conversation';
import Details from './Details'


class HandleEnquiries extends Component {
  state = {
    buttonId: 1,
    message: '',
    total:''
  }

  setButton = (id) => {
    this.setState({ buttonId: id });
  }

  handleArchive = () => {
    const { markAsArchived, enquireyDetails, getArchivedEnquiries, getEnquiryDetails } = this.props;
    const { id, EnquriyLawyerDetails = [] } = enquireyDetails || {};
    const { isArchived } = EnquriyLawyerDetails[0] || {};

    markAsArchived({ enquiryId: id, isArchived: !isArchived }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: { description: errorMessage }
        });
      }

      this.setState({
        message: {
          description: `Enquiry has been ${isArchived ? 'UNARCHIVE': 'ARCHIVE'} successfully`,
          type: 'success'
        }
      });

      getArchivedEnquiries();
      getEnquiryDetails({ id })
    })
  }
  setTotal =()=>{

  }
  render() {
    const { buttonId, message } = this.state;
    const { enquireyDetails ,total,loading } = this.props;
    const { User, title, createdAt, problem, EnquriyLawyerDetails = [] } = enquireyDetails || {};
    const { imageUrl, firstName, lastName } = User || {};

    const { isArchived } = EnquriyLawyerDetails[0] || {};
    return (
      <div>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress 
            color="inherit"
            height={3}
        /> 
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message && message.description && message.type === 'success'}
          onClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
          message={message && message.description}
        />
        <div className="col-sm-12 no-padding top-cases-section">
          <div className="right-side-enq-heading">
            {title}
            <span
              onClick={this.handleArchive}
              className="right-side-archive">
              {isArchived ? 'UNARCHIVE' : 'ARCHIVE'}
            </span>
          </div>
          <div className="row">
            <div className="col-sm-1">
              <div className="box-image">
                <Avatar
                  src={imageUrl}
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
            </div>
            <div className="col-sm-11">
              <div className="enq-name-date">
                <span className="enq-name-date-text">
                  {firstName}{" "}
                  {lastName}
                </span>
                <span className="enq-name-date-time">
                  {moment(createdAt).format("LL")},{" "}
                  {moment(createdAt).format("HH:mm")}
                </span>
              </div>

              <div className="enq-title">
                {problem}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 no-padding">
          <div className="filter-lawyer-prof">
            <span
              className={buttonId === 1 && "active-filter"}
              onClick={() => this.setButton(1)}>
              ENQUIRY
            </span>
            <span
              className={buttonId === 2 && "active-filter"}
              onClick={() => this.setButton(2)}>
              ATTACHMENT
            </span>
            <span
              className={buttonId === 3 && "active-filter"}
              onClick={() => this.setButton(3)}>
              NOTES
            </span>
            <span
              className={buttonId === 4 && "active-filter"}
              onClick={() => this.setButton(4)}>
              DETAILS
            </span>
          </div>

          {buttonId === 1 && <Conversation  {...this.props}/>}
          {buttonId === 2 && <EnquiryAttachment {...this.props}/>}
          {buttonId === 3 && <EnquiryNotes {...this.props} />}
          {buttonId === 4 && <Details  {...this.props}/>}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = ({ enquiries, auth }) => ({ 
  ...enquiries,
   auth 
});

export default connect(
  mapStoreToProps,
  null
)(HandleEnquiries);
