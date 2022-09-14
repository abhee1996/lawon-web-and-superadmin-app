import React, { Component } from 'react';
import { Route, HashRouter, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import NavBar from '../components/molecules/navbar';
import UserDashboardMain from "../containers/UserDashboardMain";
import UserBookConsultation from "../containers/UserBookConsultation";
import UserConsultationLocation from "../containers/UserConsultationLocation";
import UserChooseLAwyer from "../containers/UserChooseLawyer";
import UserConsultationDateTime from "../containers/UserConsultationDateTime";
import UserConsultationAdditional from "../containers/UserConsultationAddidtional";
import UserConsultSummary from "../containers/UserConsultSummary";
import UserConsultationConfirm from "../containers/UserConsultationConfirm";
import UserAllConsultations from "../containers/UserAllConsultations";
import UserConsultationMain from "../containers/UserConsultationMain";
import UserLawyerProfile from "../containers/UserLawyerProfile";
import UserAllQuestions from "../containers/UserAllQuestions";
import UserViewQuestion from "../containers/UserViewQuestion";
import UserViewAnswer from "../containers/UserViewAnswer";
import UserInstructLawyer from "../containers/UserInstructLawyer";
import UserPaymentStripe from "../containers/UserPaymentStripe";
import UserInstructLawyerConfirm from "../containers/UserInstructLawyerConfirm";
import AskALawyer from "../containers/AskALawyer";
import AskALawyerDescription from "../containers/AskaLawyerDescrip";
import UserAllInsturctions from "../containers/UserAllInstructions";
import UserInstructionsDetails from "../containers/UserInstructionsDetails";
import UserProfile from "../containers/UserProfile";
import UserFirmProfile from "../containers/UserFirmProfile";
import AskALawyerConfirm from "../containers/AskAlawyerConfirm";
import UserFirstTime from "../containers/UserFirstTime";
import PaymentHistory from "../containers/UserPaymentHistory"

class MainLayout extends Component {
  render() {
    const { accessToken, user } = this.props;
    if (!accessToken || !user || !Object.keys(user).length) {
      window.location = '#/main/usersociallogin';
    }

    return (
      <div>
        <NavBar />
        <HashRouter>
          <Switch location={this.props.history.location}>
            <Route path="/main/userfirsttime" component={UserFirstTime} />
            <Route path="/main/userdashboardmain" component={UserDashboardMain} />
            <Route path="/main/user/lawyerprofile/:id" component={UserLawyerProfile} />
            <Route exact path="/main/user/payment-history" component={PaymentHistory} />

            {/* ////////////////////  QUESTIONS /////////////////////// */}
            <Route path="/main/askalawyer" component={AskALawyer} />
            <Route path="/main/askalawyerdescription" component={AskALawyerDescription} />
            <Route path="/main/userallquestions" component={UserAllQuestions} />
            <Route exact path="/main/userviewquestion/:id" component={UserViewQuestion} />
            <Route exact path="/main/question/conversation/:conversationId/repley" component={UserViewAnswer} />
            <Route exact path="/main/question/conversation/:conversationId/instruction" component={UserInstructLawyer} />
            <Route exact path="/main/question/conversation/:conversationId/instruct-lawyer/payment" component={UserPaymentStripe} />
            <Route path="/main/instruct-confirm/:id" component={UserInstructLawyerConfirm} />
            <Route path="/main/askalawyerconfirm" component={AskALawyerConfirm} />

            {/* ////////////////////  CONSULTATION /////////////////////// */}
            <Route path="/main/userallconsultations" component={UserAllConsultations} />
            <Route path="/main/consultation/:id" component={UserConsultationMain} />
            <Route path="/main/userbookconsultation" component={UserBookConsultation} />
            <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/location" component={UserConsultationLocation} />
            <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/location/:placeId/:radius/lawyers" component={UserChooseLAwyer} />
            <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime" component={UserConsultationDateTime} />
            <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/details" component={UserConsultationAdditional} />
            <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/enquiry/:enquiryId/details" component={UserConsultationAdditional} />
            <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/summary" component={UserConsultSummary} />
            <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/enquiry/:enquiryId/summary" component={UserConsultSummary} />
            <Route path="/main/user/consultation/:id/confirmation" component={UserConsultationConfirm} />
            <Route exact path="/main/user/consultation/:consultationId/instruct-lawyer/payment" component={UserPaymentStripe} />

            {/* ////////////////////  INSTRUCTIONS /////////////////////// */}
            <Route path="/main/userallinsturctions" component={UserAllInsturctions} />
            <Route path="/main/user/instructions/details/:id" component={UserInstructionsDetails} />

            <Route path="/main/userprofile" component={UserProfile} />
            <Route path="/main/user/firm-profile/:id" component={UserFirmProfile} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return { ...auth };
}

export default connect(mapStateToProps)(withRouter(MainLayout));