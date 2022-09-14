import React from 'react';

export const Input = (props) => (
  <input
    className="form-control"
    onChange={props.handleChange}
    {...props}
  />
);