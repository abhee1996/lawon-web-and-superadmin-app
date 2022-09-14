import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            this.props.lawyerLogin ?
                <Redirect to="/main" />
            : <Component {...props} />
        )} />
    );
};

const mapStoreToProps = ({common}) => {
    return {
      lawyerLogin: common.lawyerLogin,  
    };
  };
export default connect(mapStoreToProps,null)(PublicRoute);