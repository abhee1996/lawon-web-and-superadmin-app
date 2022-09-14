import React, { Component } from 'react';
import {Button, TYPES} from '../../atoms/YellowButton'
export const TimeSlot = ({props}) => {
    return (  

      <div className="timeslot">
       <div className='big-slot-btn'>
                     <Button 
                      text='Today, 26/05' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.BlackGeneric}  
                    />
       </div>
       <div className='mini-slot-btns'>
                     <Button 
                      text='11:00' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.BlackGeneric}  
                    />
                      <Button 
                      text='12:90' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.BlackGeneric}  
                    />
       </div>

           <div className='mini-slot-btns'>
                     <Button 
                      text='11:00' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.BlackGeneric}  
                    />
                      <Button 
                      text='12:90' 
                      type='button' 
                      onClick={() => {}}
                      buttonType={TYPES.BlackGeneric}  
                    />
       </div>
     
      </div>
)
}

export default TimeSlot;
