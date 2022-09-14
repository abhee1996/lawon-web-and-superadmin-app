import { combineReducers } from 'redux';
import auth from './auth';
import userProfile from './userProfile';
import questions from './questions';
import instruction from './instruction';
import transectionHistory from './transectionHistory';
import organization from './organization';
import userConsultation from './userConsultation';
import payments from './payments';
import lawyerProfile from './lawyerProfile';
import dashboard from './dashboard';

export default combineReducers({
  auth,
  userProfile,
  questions,
  instruction,
  transectionHistory,
  organization,
  userConsultation,
  payments,
  lawyerProfile,
  dashboard
});
