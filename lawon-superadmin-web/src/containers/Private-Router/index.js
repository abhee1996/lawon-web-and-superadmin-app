import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { connect } from 'react-redux'
export const PrivateRoute=({ children,isLogin, ...rest })=> {
  
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin
        ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/main/adminlogin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}   
const mapStoreToProps = state => {
  return {
    isLogin: state.isLogin

  };
};

export default connect(mapStoreToProps)(PrivateRoute)