import React, { Component } from 'react';
import classnames from 'classnames';

export const TYPES = {
    Register: 'btn register-btn',
    Login: 'btn register-btn',
    TopDashbord: 'btn top-dashboard-btn',
    Generic: 'btn btn-generic',
    Facebook:'btn facebook-btn',
    Google: 'btn google-btn',
    Document: 'btn document-btn',
    BlackGeneric: 'btn btn-blackgeneric',
    YellowGeneric:'btn btn-generic-yellow-transp'
  }

  export const Button = ({ 
    text, 
    onClick, 
    type, 
    buttonType 
  }) => (
    <button
      type={type}
      onClick={onClick}
      className={buttonType}
      >
      {text}
    </button>
  );
  export default Button;