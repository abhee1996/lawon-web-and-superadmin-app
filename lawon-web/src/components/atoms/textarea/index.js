import React, { Component } from 'react';
export const TextArea = (props) => {
    return (  

    <textarea
      className="form-control"
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
)
}

export default TextArea;