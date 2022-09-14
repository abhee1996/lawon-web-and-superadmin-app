import React, { Component } from 'react';
export const Input = (props) => {
    return (  

    <input
      className="form-control"
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
)
}

export default Input;