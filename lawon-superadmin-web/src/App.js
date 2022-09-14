'use strict'
import React, { Component } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './containers/MainLayout'
import HomePage from './containers/HomePage';
import DashboardMasterPage from './containers/DashboardMasterPage'
import AdminLogin from './containers/Admin-Login'
import AdminForgotPassword from './containers/Admin-Login/Admin-Forgot-Password'
import AdminEnterCode from './containers/Admin-Login/Admin-Enter-Code'
import AdminCreatePassword from './containers/Admin-Login/Create-Password'
import PageNotFound from './containers/Page-Not-Found'
import { HashRouter } from 'react-router-dom'
import SuperAdminDashboard from './containers/Super-Admin-Dashboard/index';
import FirmDetails from './containers/Firm-Details/index';
import LawyersProfile from './containers/Lawyers-Profile/index';
import AdminEditPlan from './containers/Admin-EditPlan/index';
import AdminCreatePlan from './containers/Admin-CreatePlan/index';
import AdminEditProfile from './containers/Admin-Login/Admin-Edit-Profile/index';
import Categories from './containers/Admin-Categories/index';
import CreateSubCategories from './containers/Admin-Categories/Create-Subcategory/index';
import CreateCategory from './containers/Admin-Categories/Create-Category/index';
import EditCategory from './containers/Admin-Categories/Edit-Category/index';
import EditSubCategory from './containers/Admin-Categories/Edit-SubCategory';
import ManageCoupon from './containers/Manage-Coupon/index';
import CreateCoupon from './containers/Manage-Coupon/Create-Coupon/index';
import EditCoupon from './containers/Manage-Coupon/Edit-Coupon/index';
import Onboarding from './containers/Mobile-Onboarding/index';
import AddNewScreen from './containers/Mobile-Onboarding/Add-New-Screen/index';
import EditScreen from './containers/Mobile-Onboarding/Edit-Screen/index';
import ManageBlog1 from './containers/Manage-Blog1/index';
import CategoryBlog from './containers/Manage-Blog1/Category-Blogs/index';
import AddBlog from './containers/Manage-Blog1/Add-Blog/index';
import EditBlog from './containers/Manage-Blog1/Edit-Blog/index';
import AddBlogCategory from './containers/Manage-Blog1/Add-Blog-Category/index';
import Help from './containers/Help_/index';
import AddNewArticle from './containers/Help_/Add-Article/index';
import EditArticle from './containers/Help_/Edit-Article/index';
import AddNewCategory from './containers/Help_/Add-Category/index';
import EditArticleCategory from './containers/Help_/Edit-Article-Category/index';
import AboutUs from './containers/Content/About-Us';
import PrivacyPolicy from './containers/Content/Privacy-Policy/index';
import TermsAndCondition from './containers/Content/Terms-And-Conditions/index';
import AdminManagePlan from './containers/Admin-ManagePlan/index';
import ContactInquiries from './containers/Contact-Inquiries/index';
import FreeUsers from './containers/Free-User/index';
import LawyersPage from './containers/Lawyers/index';
import FirsmList from './containers/Firm-Lists/index';
import TransactionHistory from './containers/Transaction-History/index';
import AdminManagePlanView from './containers/Admin-ManagePlan/Admin-Plan-View/index';





class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>

      <HashRouter>


          <Route exact path='/' component={AdminLogin}></Route>
          <Route  path='/main' component={MainLayout}></Route>
          <Route  path='/main/adminlogin' component={AdminLogin}></Route>
          <Route path='/main/adminforgotpassword' component={AdminForgotPassword}></Route>
          <Route path='/main/admincreatepassword' component={AdminCreatePassword}></Route>
          <Route  path='/main/adminentercode' component={AdminEnterCode}></Route>
          <Route exact path='/homepage' component={HomePage}></Route>
          <Route path='/main/dashboardmaster' component={DashboardMasterPage}></Route>
          <Route  path="/404" component={PageNotFound}></Route>
          <Route exact path="/main/dashboardmaster/superadmindashboard">
                <SuperAdminDashboard />
              </Route>
              <Route exact path='/main/dashboardmaster/firmdetails' component={FirmDetails}></Route>
              <Route path='/main/dashboardmaster/lawyersprofile/:id' component={LawyersProfile}></Route>
              <Route exact path='/main/dashboardmaster/admineditplan' component={AdminEditPlan}></Route>
              <Route path='/main/dashboardmaster/admincreateplan' component={AdminCreatePlan}></Route>
              <Route path='/main/dashboardmaster/adminprofile' component={AdminEditProfile}></Route>
              <Route path='/main/dashboardmaster/categories' component={Categories}></Route>
              <Route path='/main/dashboardmaster/adminsubcategory' component={CreateSubCategories}></Route>
              <Route path='/main/dashboardmaster/createcategory' component={CreateCategory}></Route>
              <Route path='/main/dashboardmaster/editcategory' component={EditCategory}></Route>
              <Route path='/main/dashboardmaster/editsubcategory' component={EditSubCategory}></Route>
              <Route path='/main/dashboardmaster/managecoupon' component={ManageCoupon}></Route>
              <Route path='/main/dashboardmaster/createcoupon' component={CreateCoupon}></Route>
              <Route path='/main/dashboardmaster/editcoupon' component={EditCoupon}></Route>
              <Route path='/main/dashboardmaster/mobileonboard' component={Onboarding}></Route>
              <Route path='/main/dashboardmaster/addnewscreen' component={AddNewScreen}></Route>
              <Route path='/main/dashboardmaster/editonboardingscreen' component={EditScreen}></Route>
              <Route path='/main/dashboardmaster/manageblog1' component={ManageBlog1}></Route>
              <Route path='/main/dashboardmaster/categoryblogs' component={CategoryBlog}></Route>
              <Route path='/main/dashboardmaster/addblog' component={AddBlog}></Route>
              <Route path='/main/dashboardmaster/editblog' component={EditBlog}></Route>
              <Route path='/main/dashboardmaster/addblogcategory' component={AddBlogCategory}></Route>
              <Route path='/main/dashboardmaster/help' component={Help}></Route>
              <Route path='/main/dashboardmaster/addnewarticle' component={AddNewArticle}></Route>
              <Route path='/main/dashboardmaster/edithelparticle' component={EditArticle}></Route>
              <Route path='/main/dashboardmaster/addnewcategory' component={AddNewCategory}></Route>
              <Route path='/main/dashboardmaster/edithelparticlecategory' component={EditArticleCategory}></Route>
              <Route path='/main/dashboardmaster/aboutus' component={AboutUs}></Route>
              <Route path='/main/dashboardmaster/privacypolicy' component={PrivacyPolicy}></Route>
              <Route path='/main/dashboardmaster/termsandcondition' component={TermsAndCondition}></Route>
              <Route path='/main/dashboardmaster/manageplan' component={AdminManagePlan}></Route>
              <Route path='/main/dashboardmaster/contactinquiries' component={ContactInquiries}></Route>
              <Route path='/main/dashboardmaster/freeuser' component={FreeUsers}></Route>
              <Route path='/main/dashboardmaster/lawyers' component={LawyersPage}></Route>
              <Route path='/main/dashboardmaster/firmlist' component={FirsmList}></Route>
              <Route path='/main/dashboardmaster/transactionhistory' component={TransactionHistory}></Route>
              <Route path='/main/dashboardmaster/manageplanView' component={AdminManagePlanView}></Route>
              {/* <Route exact={true} path="/main/dashboardmaster/*" component={PageNotFound}></Route> */}


      </HashRouter>
    );
  }
}

export default App;

// THIS FILE IS CHANGE