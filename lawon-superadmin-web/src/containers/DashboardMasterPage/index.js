import React, { Component } from 'react';
import SideBar from '../../components/molecules/sidebar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import AdminManagePlan from "../Admin-ManagePlan"
import TransactionHistory from "../Transaction-History"
import ContactInquiries from "../Contact-Inquiries"
import FreeUsers from "../Free-User"
import LawyersPage from "../Lawyers"
import FirsmList from "../Firm-Lists"
import AdminManagePlanView from "../Admin-ManagePlan/Admin-Plan-View"
import SuperAdminDashboard from '../Super-Admin-Dashboard'
import FirmDetails from '../Firm-Details'
import AdminEditPlan from '../Admin-EditPlan'
import AdminCreatePlan from '../Admin-CreatePlan'
import AdminProfile from '../Admin-Login/Admin-Profile'
import AdminEditProfile from '../Admin-Login/Admin-Edit-Profile'
import Categories from '../Admin-Categories'
import CreateSubCategories from '../Admin-Categories/Create-Subcategory'
import CreateCategory from '../Admin-Categories/Create-Category'
import EditSubCategory from '../Admin-Categories/Edit-SubCategory'
import EditCategory from '../Admin-Categories/Edit-Category'
import ManageCoupon from '../Manage-Coupon'
import CreateCoupon from '../Manage-Coupon/Create-Coupon'
import EditCoupon from '../Manage-Coupon/Edit-Coupon'
import Onboarding from '../Mobile-Onboarding'
import AddNewScreen from '../Mobile-Onboarding/Add-New-Screen'
import EditScreen from '../Mobile-Onboarding/Edit-Screen'
import ManageBlog1 from '../Manage-Blog1'
import Help from '../Help_'
import AddNewArticle from '../Help_/Add-Article'
import EditArticle from '../Help_/Edit-Article'
import AddNewCategory from '../Help_/Add-Category'
import EditArticleCategory from '../Help_/Edit-Article-Category'
import AddBlog from '../Manage-Blog1/Add-Blog'
import EditBlog from '../Manage-Blog1/Edit-Blog'
import AddBlogCategory from '../Manage-Blog1/Add-Blog-Category'
import CategoryBlog from '../Manage-Blog1/Category-Blogs'
import AboutUs from '../Content/About-Us'
import PrivacyPolicy from '../Content/Privacy-Policy'
import TermsAndCondition from '../Content/Terms-And-Conditions'
import PrivateRoute from '../Private-Router'
import PageNotFound from '../Page-Not-Found'
import { connect } from 'react-redux'
import Lawyers from '../Lawyers';
import LawyersProfile from '../Lawyers-Profile';
class DashboardMasterPage extends Component {

  render() {
    return (
      <div>     
        <div class={this.props.isTrue ? "col-md-2" : "col-md-1"}>
          <SideBar isTrue={this.props.isTrue} /></div>

        <div class={this.props.isTrue ? "col-md-10 animate-main no-padding" : "col-md-11   animate-main  no-padding"}>
          <HashRouter>
            <Switch>
              {/* <PrivateRoute exact path="/main/dashboardmaster/superadmindashboard">
                <SuperAdminDashboard />
              </PrivateRoute>
              <PrivateRoute exact path='/main/dashboardmaster/firmdetails' component={FirmDetails}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/lawyersprofile/:id' component={LawyersProfile}></PrivateRoute>
              <PrivateRoute exact path='/main/dashboardmaster/admineditplan' component={AdminEditPlan}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/admincreateplan' component={AdminCreatePlan}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/adminprofile' component={AdminEditProfile}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/categories' component={Categories}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/adminsubcategory' component={CreateSubCategories}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/createcategory' component={CreateCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/editcategory' component={EditCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/editsubcategory' component={EditSubCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/managecoupon' component={ManageCoupon}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/createcoupon' component={CreateCoupon}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/editcoupon' component={EditCoupon}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/mobileonboard' component={Onboarding}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/addnewscreen' component={AddNewScreen}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/editonboardingscreen' component={EditScreen}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/manageblog1' component={ManageBlog1}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/categoryblogs' component={CategoryBlog}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/addblog' component={AddBlog}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/editblog' component={EditBlog}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/addblogcategory' component={AddBlogCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/help' component={Help}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/addnewarticle' component={AddNewArticle}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/edithelparticle' component={EditArticle}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/addnewcategory' component={AddNewCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/edithelparticlecategory' component={EditArticleCategory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/aboutus' component={AboutUs}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/privacypolicy' component={PrivacyPolicy}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/termsandcondition' component={TermsAndCondition}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/manageplan' component={AdminManagePlan}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/contactinquiries' component={ContactInquiries}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/freeuser' component={FreeUsers}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/lawyers' component={LawyersPage}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/firmlist' component={FirsmList}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/transactionhistory' component={TransactionHistory}></PrivateRoute>
              <PrivateRoute path='/main/dashboardmaster/manageplanView' component={AdminManagePlanView}></PrivateRoute>
              <Route exact={true} path="/main/dashboardmaster/*" component={PageNotFound}></Route> */}
            </Switch>
          </HashRouter>
        </div>
      </div>

    );
  }
}
const mapStoreToProps = state => {
  return {
    isTrue: state.isTrue

  };
};

export default connect(mapStoreToProps, null)(DashboardMasterPage);