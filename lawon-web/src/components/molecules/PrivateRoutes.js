import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            this.props.lawyerLogin ?
                <Component {...props} />
            : <Redirect to="/main/login" />
        )} />
    );
};
const mapStoreToProps = ({common}) => {
    return {
      lawyerLogin: common.lawyerLogin,  
    };
  };
export default connect(mapStoreToProps,null)(PrivateRoute);
