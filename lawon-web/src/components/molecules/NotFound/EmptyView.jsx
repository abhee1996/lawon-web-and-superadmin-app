import React from 'react';

export const EmptyList = ({ children, style }) => {
  return (
    <div
      style={{
        height: '112px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'gray',
        ...style
      }}>
      <div>
        {children}
      </div>
    </div>
  )
}