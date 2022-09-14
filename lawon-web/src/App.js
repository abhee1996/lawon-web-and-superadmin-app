import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";

import "./App.css";
import EmailRegister from "./containers/Email-Register";
import DashboardMasterPage from "./containers/DashboardMasterPage";
import AdminSetup from "./containers/AdminSetup";
import WelcomeToLawon from "./containers/WelcomeToLawon";

import TestingLinks from "./containers/Testing";
import UserEnterCode from "./containers/UserEnterCode";
import MobilePrivacy from "./containers/MobileViews/MobilePrivacy";
import MobileTerms from "./containers/MobileViews/MobileTerms";
import BlogDetails from "./containers/BlogDetails/BlogDetails";
import MakePayment from "./containers/MakePayment";
import MobileVerify from "./containers/MobileVerify";
import VerifyMobileNumber from "./containers/verfiyMobileNumber";
import UpdatePlan from "./containers/Billing/Update-Plan";
import Help from "./containers/Help_";
import TestPage from "./containers/SimilarArticles/TestPage";
import UserPaymentDetails from "./containers/UserPaymentDetails";

import UserLayout from './layouts/UserLayout';
import UserPublicLayout from './layouts/UserPublicLayout';
import LawyerPublicLayout from './layouts/LawyerPublicLayout';
import LawyerPostSignupLayout from './layouts/LayerPostSignupLayout';
import LawyerLayout from './layouts/LawyerLayout';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={UserPublicLayout} />
          <Route path="/main/aboutus" component={UserPublicLayout} />
          <Route path="/main/contactus" component={UserPublicLayout} />
          <Route path="/main/blog" component={UserPublicLayout} />
          <Route path="/main/privacypolicy" component={UserPublicLayout} />
          <Route path="/main/termsandconditions" component={UserPublicLayout} />
          <Route path="/main/usersociallogin" component={UserPublicLayout} />
          <Route path="/main/userregemail" component={UserPublicLayout} />
          <Route path="/main/resetpassword" component={UserPublicLayout} />
          <Route path="/main/usersocialreg" component={UserPublicLayout} />
          <Route path="/main/resetpassword-otp" component={UserPublicLayout} />
          <Route path="/main/user/newpassword" component={UserPublicLayout} />


          <Route path="/main/forlawyer" component={LawyerPublicLayout} />
          <Route path="/main/userpackages" component={LawyerPublicLayout} />
          <Route path="/main/register" component={LawyerPublicLayout} />
          <Route path="/main/login" component={LawyerPublicLayout} />
          <Route path="/main/lawyer-resetpassword" component={LawyerPublicLayout} />
          <Route path="/main/lawyer-resetpassword-otp" component={LawyerPublicLayout} />
          <Route path="/main/lawyer/newpassword" component={LawyerPublicLayout} />


          <Route path="/mobileprivacy" component={MobilePrivacy} />
          <Route path="/mobileterms" component={MobileTerms} />
          <Route path="/testpage" component={TestPage} />
          <Route path="/main/emailregister/:token" component={EmailRegister} />
          
          <Route path="/main/testinglinks" component={TestingLinks} />
          <Route path="/main/userentercode" component={UserEnterCode} />
          <Route path="/main/blogdetails" component={BlogDetails} />
          <Route path="/main/help" component={Help} />
          <Route path="/main/mobileverify" component={MobileVerify} />
          <Route path="/main/welcometolawon" component={WelcomeToLawon} />

          <Route path="/main/adminprofilesetup" component={LawyerPostSignupLayout} />
          <Route path="/main/firmprofilesetup" component={LawyerPostSignupLayout} />
          <Route path="/main/peopleprofilesetup" component={LawyerPostSignupLayout}/>

          <Route path="/main/makepayment" component={MakePayment} />
          <Route path="/main/verifyMobileNumber" component={VerifyMobileNumber}/>
          <Route path="/main/dashboardmaster/dashboardconsultation" component={LawyerLayout}/>
          <Route path="/main/dashboardmaster" component={DashboardMasterPage} />
          <Route path="/main/dashboardmaster/dashboardlink" component={LawyerLayout}/>
          <Route path="/main/adminsetup" component={AdminSetup} />
          <Route path="/main/dashboardmaster/admindashboard" component={LawyerLayout} />
          <Route path="/main/dashboardmaster/accountsettings" component={LawyerLayout}/>
          <Route path="/main/dashboardmaster/manageteam" component={LawyerLayout}/>
          <Route path="/main/dashboardmaster/enquiries" component={LawyerLayout} />
          <Route path="/main/dashboardmaster/managefirm" component={LawyerLayout} />
          <Route path="/main/dashboardmaster/dashboardcases" component={LawyerLayout} />
          <Route path="/main/dashboardmaster/dashboardcalendar" component={LawyerLayout} />
          <Route path="/main/dashboardmaster/billingcurrentplan" component={LawyerLayout} />
          <Route path="/main/userpaymentdetails" component={UserPaymentDetails} />

          <Route path="/main/userfirsttime" component={UserLayout} />
          <Route path="/main/userdashboardmain" component={UserLayout} />
          <Route path="/main/userprofile" component={UserLayout} />
          <Route path="/main/askalawyer" component={UserLayout} />
          <Route path="/main/askalawyerdescription" component={UserLayout} />
          <Route path="/main/askalawyerconfirm" component={UserLayout} />
          <Route path="/main/userallquestions" component={UserLayout} />
          <Route exact path="/main/userviewquestion/:id" component={UserLayout} />
          <Route path="/main/question/conversation/:conversationId/repley" component={UserLayout}/>
          <Route exact path="/main/question/conversation/:conversationId/instruction" component={UserLayout}/>
          <Route exact path="/main/question/conversation/:conversationId/instruct-lawyer/payment" component={UserLayout}/>
          <Route path="/main/instruct-confirm/:id" component={UserLayout}/>
          <Route path="/main/consultation/:id" component={UserLayout} />
          <Route path="/main/userallconsultations" component={UserLayout} />
          <Route path="/main/userbookconsultation" component={UserLayout}/>
          <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/location" component={UserLayout}/>
          <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/location/:latlng/:radius/lawyers" component={UserLayout}/>
          <Route exact path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime" component={UserLayout} />
          <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/details" component={UserLayout}/>
          <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/enquiry/:enquiryId/details" component={UserLayout}/>
          <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/summary" component={UserLayout}/>
          <Route exect path="/main/user/consultation/:categoryId/:subCategoryId/lawyers/:lawyerId/datetime/:date/:time/enquiry/:enquiryId/summary" component={UserLayout}/>
          <Route path="/main/user/consultation/:id/confirmation" component={UserLayout}/>
          <Route path="/main/userallinsturctions" component={UserLayout} />
          <Route path="/main/user/instructions/details/:id" component={UserLayout} />
          <Route path="/main/user/lawyerprofile/:id" component={UserLayout} />
          <Route path="/main/user/firm-profile/:id" component={UserLayout} />
          <Route exact path="/main/user/consultation/:consultationId/instruct-lawyer/payment" component={UserLayout} />
          <Route exact path="/main/user/payment-history" component={UserLayout} />

          <Route path="/main/dashboardmaster/billingupdateplan" component={UpdatePlan} />
          <Route path="/main/organizationotp" component={LawyerPostSignupLayout} />
          <Route path="/main/organizationpayment" component={LawyerPostSignupLayout} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
