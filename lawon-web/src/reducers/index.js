import { combineReducers } from "redux";
import lawyer from "./lawyer";
import consultation from "./consultation";
import instruction from "./instruction";
import accountSettings from "./accountSettings";
import manageFirm from "./manageFirm";
import manageTeam from "./manageTeam";
import calendar from "./calendar";
import user from "./user";
import enquiries from './enquiries';
import auth from "./auth";
import organization from "./organization";
import payment from "./payment";
import plans from './plans';
import dashboard from './dashboard';


export default combineReducers({
  lawyer,
  consultation,
  instruction,
  accountSettings,
  manageFirm,
  manageTeam,
  calendar,
  user,
  enquiries,
  auth,
  organization,
  payment,
  plans,
  dashboard
});
