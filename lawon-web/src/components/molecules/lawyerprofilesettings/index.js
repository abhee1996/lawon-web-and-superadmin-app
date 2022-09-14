import React from "react";
import { connect } from "react-redux";
import PracticeArea from  './PracticeArea';
import LawyerBio from './LawyerBio';
import Availability from './Availability';
import * as actions from '../../../actions/accountSettings';

class LawyerProfileSettings extends React.Component {
  state = {
    buttonId: 1
  };

  setButton = (id) => {
    this.setState({ buttonId: id });
  }

  render() {
    const { buttonId } = this.state;
    return (
      <div>
        <div className="right-side-heading">Lawyer Profile</div>
        <div className="col-sm-12 no-padding">
          <div className="filter-lawyer-prof">
            <span onClick={() => this.setButton(1)}>BIOGRAPHY</span>
            <span onClick={() => this.setButton(2)}>MY PRACTICE AREAS</span>
            <span onClick={() => this.setButton(3)}>AVAILABILTY</span>
          </div>
            {buttonId === 1 && <LawyerBio {...this.props} />}
            {buttonId === 2 && <PracticeArea {...this.props}/>}
            {buttonId === 3 && <Availability {...this.props}/>}
          </div>
      </div>
    );
  }
}

const mapStoreToProps = ({ auth, accountSettings }) => ({ auth, ...accountSettings });
export default connect(mapStoreToProps, actions)(LawyerProfileSettings);
